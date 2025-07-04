// components/invite-talent-modal.tsx
"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { TalentService, type TalentProfile } from '@/lib/services/talent-service';
import { useAuth } from './auth/auth-provider'; // Using your existing auth hook
import { toast } from "sonner";
import { Loader2, Send } from 'lucide-react';


interface InviteTalentModalProps {
    isOpen: boolean;
    onClose: () => void;
    talentToInvite: TalentProfile | null;
}

export function InviteTalentModal({ isOpen, onClose, talentToInvite }: InviteTalentModalProps) {
    const { user } = useAuth(); // Get the currently logged-in user
    const [myTapris, setMyTapris] = useState<{id: string, title: string}[]>([]);
    const [selectedTapriId, setSelectedTapriId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen && user) {
            setIsLoading(true);
            setSelectedTapriId(null); // Reset selection when modal opens
            TalentService.getUserManagedTapris(user.id)
                .then(({ data, error }) => {
                    if (error) {
                        toast.error("Could not load your projects", { description: error.message });
                        setMyTapris([]);
                    } else {
                        setMyTapris(data || []);
                    }
                    setIsLoading(false);
                });
        }
    }, [isOpen, user]);

    const handleSendInvite = async () => {
        if (!selectedTapriId || !talentToInvite || !user) return;

        setIsLoading(true);
        const promise = TalentService.sendInvitation({
            tapriId: selectedTapriId,
            invitedUserId: talentToInvite.id,
            invitingUserId: user.id,
        });

        toast.promise(promise, {
            loading: 'Sending invitation...',
            success: (res) => {
                if(res.error) {
                    // Re-throw to be caught by the error block
                    throw new Error(res.error.message);
                }
                // Automatically close the modal on success after a short delay
                setTimeout(onClose, 1000);
                return `Invitation sent to ${talentToInvite.full_name}!`;
            },
            error: (err) => {
                 // Check for the unique constraint violation error code
                if (err.message.includes('unique_invitation')) {
                    return 'You have already invited this talent to this project.';
                }
                return `Failed to send invite: ${err.message}`;
            }
        });
         // The finally block ensures isLoading is always set to false.
        promise.finally(() => setIsLoading(false));
    };

    if (!talentToInvite) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-neutral-900 border-neutral-700 text-white">
                <DialogHeader>
                    <DialogTitle>Invite {talentToInvite.full_name}</DialogTitle>
                    <DialogDescription className="text-neutral-400">
                        Select one of your projects to send an official invitation. They will be notified to join your team.
                    </DialogDescription>
                </DialogHeader>
                
                <div className="py-4 space-y-4">
                     <p className="text-sm font-medium">Select your Tapri:</p>
                      <Select onValueChange={setSelectedTapriId} disabled={isLoading || myTapris.length === 0}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={
                                isLoading ? "Loading your projects..." : 
                                myTapris.length === 0 ? "You have no approved projects" :
                                "Choose a project"
                            } />
                        </SelectTrigger>
                        <SelectContent>
                            {myTapris.map(tapri => (
                                <SelectItem key={tapri.id} value={tapri.id}>{tapri.title}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                
                <DialogFooter>
                    <Button variant="ghost" onClick={onClose} disabled={isLoading}>Cancel</Button>
                    <Button 
                        onClick={handleSendInvite}
                        disabled={!selectedTapriId || isLoading || myTapris.length === 0}
                        className="bg-pink-600 hover:bg-pink-700"
                    >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2"/> : <Send className="h-4 w-4 mr-2"/>}
                        {isLoading ? 'Sending...' : 'Send Invitation'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
