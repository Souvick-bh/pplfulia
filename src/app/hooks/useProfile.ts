import { useState, useEffect } from 'react';
import { supabase2 } from '@/api/user';
import { useAuth } from '../contexts/AuthContext';

export interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  bio: string | null;
  achievements: string | null;
  role: 'member' | 'player' | 'owner';
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  likes_count?: number;
  is_liked_by_user?: boolean;
}

export const useProfile = (userId?: string) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const targetUserId = userId || user?.id;

  useEffect(() => {
    if (!targetUserId) {
      setLoading(false);
      return;
    }

    fetchProfile();
  }, [targetUserId, user?.id]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      // First get the profile
      const { data: profileData, error: profileError } = await supabase2
        .from('profiles')
        .select('*')
        .eq('user_id', targetUserId!)
        .single();

      if (profileError) {
        if (profileError.code === 'PGRST116') {
          // No profile found, create one
          const { data: newProfile, error: createError } = await supabase2
            .from('profiles')
            .insert({
              user_id: targetUserId!,
              display_name: user?.user_metadata?.full_name || null,
              role: 'member',
            })
            .select()
            .single();

          if (createError) throw createError;
          
          setProfile({
            ...newProfile,
            role: newProfile.role as 'member' | 'player' | 'owner',
            likes_count: 0,
            is_liked_by_user: false
          });
          return;
        } else {
          throw profileError;
        }
      }

      // Get likes count
      const { count: likesCount } = await supabase2
        .from('likes')
        .select('*', { count: 'exact', head: true })
        .eq('liked_user_id', targetUserId!);

      // Check if current user liked this profile
      let isLikedByUser = false;
      if (user?.id) {
        const { data: userLike } = await supabase2
          .from('likes')
          .select('id')
          .eq('liker_id', user.id)
          .eq('liked_user_id', targetUserId!)
          .maybeSingle();
        
        isLikedByUser = !!userLike;
      }

      setProfile({
        ...profileData,
        role: profileData.role as 'member' | 'player' | 'owner',
        likes_count: likesCount || 0,
        is_liked_by_user: isLikedByUser,
      });

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user?.id || !profile) return;

    try {
      const { error } = await supabase2
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id);

      if (error) throw error;

      setProfile({ ...profile, ...updates });
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  };

  const uploadAvatar = async (file: File) => {
    if (!user?.id) return null;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase2.storage
        .from('avatars')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase2.storage
        .from('avatars')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (err: any) {
      setError(err.message);
      return null;
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    uploadAvatar,
    refetch: fetchProfile,
  };
};