"use client"
import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../hooks/useProfile';
import {RiArrowGoBackLine} from 'react-icons/ri'
import Link from 'next/link';
import { useRouter } from "next/navigation";
import {Heart} from "lucide-react"

import { VT323 } from "next/font/google";
const vt323 = VT323({
      subsets:["latin"],
      weight: "400",
});

const Profile = () => {
  const { user,signOut } = useAuth();
  const { profile, loading, updateProfile, uploadAvatar } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    display_name: '',
    bio: '',
    achievements: '',
    role: 'member' as 'member' | 'player' | 'owner',
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  React.useEffect(() => {
    if (profile) {
      setFormData({
        display_name: profile.display_name || '',
        bio: profile.bio || '',
        achievements: profile.achievements || '',
        role: profile.role,
      });
    }
  }, [profile]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (profile) {
      setFormData({
        display_name: profile.display_name || '',
        bio: profile.bio || '',
        achievements: profile.achievements || '',
        role: profile.role,
      });
    }
  };

  const handleSave = async () => {
    const success = await updateProfile(formData);
    if (success) {
      setIsEditing(false);
    }
  };

  function handleSignOut() {
    signOut();
    router.replace('/auth');
  }

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const avatarUrl = await uploadAvatar(file);
      if (avatarUrl) {
        await updateProfile({ avatar_url: avatarUrl });
    } 
    } catch (error) {
        console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner':
        return 'text-[#F4A004]';
      case 'player':
        return 'text-[#beee62]';
      case 'member':
      default:
        return 'text-[#7e52a0]';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <img src='/icons/richmonkey.jpg' className="h-5 w-5 rounded-[50%]" />;
      case 'player':
        return <img src='/icons/playermonkey.jpg' className="h-5 w-5 rounded-[50%]" />;
      default:
        return <img src='/icons/membermonkey.jpg' className="h-5 w-5 rounded-[50%]" />;
    }
  };

  if (loading) {
    return (
      <div className={`${vt323.className} bg-[#000000] text-[#ffffff] min-h-screen flex flex-col `}>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  const handleRoleChange = (value: 'member' | 'player' | 'owner') => {
    setFormData({ ...formData, role: value })
  };

   if (!profile) {
    return (
      <div className={`${vt323.className} bg-[#000000] text-[#ffffff] min-h-screen flex flex-col `}>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Profile not found</div>
        </div>
      </div>
    );
  }

  return(
    <div className={`${vt323.className} bg-[#000000] text-[#ffffff] min-h-screen flex flex-col items-center pr-5 pl-5`}>
        <Link href="/">
            <button className="absolute mt-5 ml-5 md:ml-10 pt-2 pb-2 pl-4 pr-4 rounded-4xl cursor-pointer bg-[#454545] active:bg-[#1d1c1c] border-2 border-[#252921] top-0 left-0">
                <RiArrowGoBackLine />
            </button>
        </Link>
        <div className="border-2 border-[#252525] max-w-3xl mt-16 pt-8 pb-8 pr-8 pl-8 rounded-2xl space-y-6">
        <div className="shadow-cricket">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className='text-[#ea5e00] text-xl'>My Profile</span>
              {!isEditing ? (
                <button className='border-1 border-[#252525] py-1 px-3 rounded-lg active:bg-[#3f3f3f]' onClick={handleEdit} >
                  
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button  className='border-1 border-[#252525] py-1 px-3 rounded-lg active:bg-[#3f3f3f]' onClick={handleSave} >
                    
                    Save
                  </button>
                  <button  className='border-1 border-[#252525] py-1 px-3 rounded-lg active:bg-[#3f3f3f]' onClick={handleCancel} >
                    
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-6">
            
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="relative flex  h-28 w-28 justify-center items-center border-1 border-[#252525] rounded-[50%] overflow-hidden">
                    <div className="absolute text-2xl">
                    {profile.display_name?.[0] || user?.email?.[0]?.toUpperCase()}
                    </div>
                    <img className={`absolute rounded-[50%] border-4 ${profile.role=='owner'?'border-[#F4A004]':profile.role=='player'?'border-[#beee62]':'border-[#7e52a0]'} `} src={profile.avatar_url || undefined} />
                    
                </div>
                {isEditing && (
                  <button
                    className="absolute -top-4 rounded-[50%]  h-28 w-28 p-0"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    Change
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">
                    {profile.display_name || 'Anonymous Cricket Fan'}
                  </h2>
                  {/* <div className={`flex bg-transparent items-center gap-1 ${getRoleColor(profile.role)}`}>
                    {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                    {getRoleIcon(profile.role)}
                  </div> */}
                </div>
                <div className="flex flex-col justify-start gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {profile.likes_count || 0} likes
                  </div>
                  <div>Joined {new Date(profile.created_at).toLocaleDateString()}</div>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="grid gap-3">
              <div className="space-x-2 flex">
                <label className='text-md' htmlFor="display_name">Display Name :</label>
                {isEditing ? (
                  <input
                    id="display_name"
                    value={formData.display_name}
                    onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                    placeholder="Your display name"
                  />
                ) : (
                  <p className="bg-transparent ">
                    {profile.display_name || 'Not set'}
                  </p>
                )}
              </div>

              <div className="space-x-2 flex">
                <label htmlFor="role">Role : </label>
                {isEditing ? (
                  <select className='bg-[#000000]'
                    value={formData.role}
                    onChange={e => handleRoleChange(e.target.value as 'member' | 'player' | 'owner')}
                  >
                    
                      <option value="member">Member</option>
                      <option value="player">Player</option>
                      <option value="owner">Owner</option>
                    
                  </select>
                ) : (
                  <div className="">
                    <div className={`flex bg-transparent items-center gap-1 ${getRoleColor(profile.role)}`}>
                    {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                    {getRoleIcon(profile.role)}
                  </div>
                  </div>
                )}
              </div>

              <div className="space-x-2 flex flex-row justify-start">
                {profile.bio?(<label className='' htmlFor="bio">#</label>):(<label htmlFor="bio"></label>)}
                {isEditing ? (
                        <textarea className='text-center rounded-2xl w-55 overflow-hidden border-1 border-[#252525]'
                            id="bio"
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            placeholder="Tell us about yourself..."
                            rows={3}
                        />
                   
                  
                ) : (
                  <p className="bg-transparent max-w-60 rounded-2xl">
                    {profile.bio || 'Add bio to show who you are!'}
                  </p>
                )}
              </div>

              <div className="space-x-2 flex flex-row justify-start">
                {profile.achievements?(<label htmlFor="achievements">#</label>):(<label htmlFor="achievements"></label>)}
                {isEditing ? (
                  <textarea className='text-center rounded-2xl w-55 border-1 border-[#252525]'
                    id="achievements"
                    value={formData.achievements}
                    onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                    placeholder="Your cricket achievements..."
                    rows={3}
                  />
                ) : (
                  <p className="bg-transparent max-w-60 rounded-2xl ">
                    {profile.achievements || 'No achievements listed'}
                  </p>
                )}
              </div>

              <div className='flex justify-center'>
                <button className='border-1 border-[#252525] py-1 px-3 rounded-lg active:bg-[#3f3f3f]' onClick={handleSignOut}>Sign out</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Profile;

