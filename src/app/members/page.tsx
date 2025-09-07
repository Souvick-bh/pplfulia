"use client"
import Link from 'next/link'
import React from 'react';
import { useMembers } from '../hooks/useMembers';
import { useAuth } from '../contexts/AuthContext';
import { Heart } from 'lucide-react';



import { RiArrowGoBackLine } from "react-icons/ri";
import { VT323 } from "next/font/google"
const vt323 = VT323({
      subsets:["latin"],
      weight: "400",
})


 


export default function Members() {
    const { members, loading, toggleLike } = useMembers();
    const { user } = useAuth();

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
            return <img src='/icons/richmonkey.jpg' className="border-2 border-[#252525] h-10 w-10 rounded-[50%]" />;
        case 'player':
            return <img src='/icons/playermonkey.jpg' className="border-2 border-[#252525] h-10 w-10 rounded-[50%]" />;
        default:
            return <img src='/icons/membermonkey.jpg' className="border-2 border-[#252525] h-10 w-10 rounded-[50%]" />;
        }
    };

    const handleLike = (targetUserId: string, currentlyLiked: boolean) => {
        if (!user) return;
        toggleLike(targetUserId, currentlyLiked);
    };

    if (loading) {
    return (
      <div className={`${vt323.className} bg-[#000000] text-[#ffffff] min-h-screen flex flex-col items-center justify-center`}>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading members...</div>
        </div>
      </div>
    );
  }

    

    return(
        <div className={`${vt323.className} bg-[#000000] text-[#ffffff] min-h-screen flex flex-col justify-center pr-5 pl-5`}>
            <Link href="/">
                <button className="absolute mt-5 ml-5 md:ml-10 pt-2 pb-2 pl-4 pr-4 rounded-4xl cursor-pointer bg-[#454545] active:bg-[#1d1c1c] border-2 border-[#252921] top-0 left-0">
                    <RiArrowGoBackLine />
                </button>
            </Link>

            <Link href="/auth">
                <button className="absolute top-0 right-5 md:right-10 mt-5 ml-5 md:ml-10 pt-1 pb-1 pl-4 pr-4 rounded-4xl cursor-pointer bg-[#454545] active:bg-[#1d1c1c] border-2 border-[#252921]">
                    {user ? 'Profile' : 'Join Us'}
                </button>
            </Link>

            <div className="top-0 mb-16">
                <div className="mt-16 sm:mt-0  mb-8">
                    <h1 className="text-3xl font-bold mb-2 text-center">Club Associates</h1>
                    <p className="text-muted-foreground text-center">
                        Meet our cricket club community, sorted by popularity
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member, index) => (
                    <div key={member.id} className="border-2 border-[#252525] rounded-2xl">
                    <div className="p-4">
                        <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="relative flex h-12 w-12 justify-center items-center border-1 border-[#252525] rounded-[50%] overflow-hidden">
                            <div className="absolute text-2xl">
                                {member.display_name?.[0] || user?.email?.[0]?.toUpperCase()}
                            </div>
                            <img className='absolute ' src={member.avatar_url || undefined} />
                            
                        </div>
                            <div className='flex flex-row w-60 justify-between items-center'>
                                <div className='flex flex-col '>
                                    <h3 className="text-lg font-medium">
                                        {member.display_name || 'Anonymous Cricket Fan'}
                                    </h3>
                                    <div className='flex flex-row gap-5 '>
                                        {index < 3 && (
                                        <div className="text-md">
                                            #{index + 1}
                                        </div>)}
                                        {user && user.id !== member.user_id && (
                                            <button
                                            onClick={() => handleLike(member.user_id, member.is_liked_by_user || false)}
                                            className={` flex items-center  ${
                                                member.is_liked_by_user
                                                ? 'text-red-500 hover:text-red-600'
                                                : 'text-muted-foreground hover:text-red-500'
                                            }`}
                                            ><div className='font-bold text-red-200'>Hit</div> 
                                            <Heart 
                                                className={`h-4 w-4 ml-1 ${member.is_liked_by_user ? 'fill-current' : ''}`} 
                                            />
                                            </button>
                                        )}
                                        
                                    </div>
                                    
                                </div>
                            
                                <div className={`flex items-center mr-4 gap-1 text-lg ${getRoleColor(member.role)}`}>
                                {getRoleIcon(member.role)}
                                {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                                </div>
                                
                            </div>
                        </div>
                        
                        </div>

                        <div className="space-y-3">
                        {member.bio && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                            {member.bio}
                            </p>
                        )}

                        {member.achievements && (
                            <div className="space-y-1">
                            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Achievements
                            </h4>
                            <p className="text-sm line-clamp-2">
                                {member.achievements}
                            </p>
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-2 border-t">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Heart className="h-3 w-3" />
                            <span>{member.likes_count || 0} likes</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                            Joined {new Date(member.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                year: 'numeric'
                            })}
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                ))}
                </div>

                {members.length === 0 && (
                <div className="text-center py-12">
                    <div className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No members yet</h3>
                    <p className="text-muted-foreground">
                    Be the first to join and create your profile!
                    </p>
                </div>
                )}
            </div>
            
        </div>
    )
}

