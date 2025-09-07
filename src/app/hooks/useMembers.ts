"use client"
import { useState, useEffect } from 'react';
import { supabase2 } from '@/api/user';
import { useAuth } from '../contexts/AuthContext';
import { Profile } from './useProfile';

export const useMembers = () => {
  const [members, setMembers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null | any>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchMembers();
  }, [user]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all profiles
      const { data: profiles, error } = await supabase2
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // For each profile, get likes count and user's like status
      const processedMembers = await Promise.all(
        profiles.map(async (member) => {
          // Get likes count
          const { count: likesCount } = await supabase2
            .from('likes')
            .select('*', { count: 'exact', head: true })
            .eq('liked_user_id', member.user_id);

          // Check if current user liked this profile
          let isLikedByUser = false;
          if (user?.id) {
            const { data: userLike } = await supabase2
              .from('likes')
              .select('id')
              .eq('liker_id', user.id)
              .eq('liked_user_id', member.user_id)
              .maybeSingle();
            
            isLikedByUser = !!userLike;
          }

          return {
            ...member,
            role: member.role as 'member' | 'player' | 'owner',
            likes_count: likesCount || 0,
            is_liked_by_user: isLikedByUser,
          };
        })
      );

      // Sort by likes count (descending)
      processedMembers.sort((a, b) => (b.likes_count || 0) - (a.likes_count || 0));
      
      setMembers(processedMembers);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (targetUserId: string, currentlyLiked: boolean) => {
    if (!user?.id) return;

    try {
      if (currentlyLiked) {
        // Remove like
        const { error } = await supabase2
          .from('likes')
          .delete()
          .eq('liker_id', user.id)
          .eq('liked_user_id', targetUserId);

        if (error) throw error;
      } else {
        // Add like
        const { error } = await supabase2
          .from('likes')
          .insert({
            liker_id: user.id,
            liked_user_id: targetUserId,
          });

        if (error) throw error;
      }

      // Update local state
      setMembers(members.map(member => {
        if (member.user_id === targetUserId) {
          const newLikesCount = currentlyLiked 
            ? (member.likes_count || 1) - 1 
            : (member.likes_count || 0) + 1;
          
          return {
            ...member,
            likes_count: newLikesCount,
            is_liked_by_user: !currentlyLiked,
          };
        }
        return member;
      }));

      // Re-sort by likes count
      setMembers(prev => [...prev].sort((a, b) => (b.likes_count || 0) - (a.likes_count || 0)));
      
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    members,
    loading,
    error,
    toggleLike,
    refetch: fetchMembers,
  };
};