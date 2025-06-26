// components/database-status.tsx
'use server'
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
// ... other UI imports
import { isSupabaseConfigured as isClientConfigured } from "@/lib/supabase";

async function checkServerStatus() {
    'use server' // Server Action
    // Dynamic imports inside a server action are a good pattern
    const { createClient } = await import('@/lib/supabase/server');
    const { isAdminConfigured } = await import('@/lib/supabase/admin');
    const supabase = createClient();
    const { error } = await supabase.from("profiles").select("id").limit(1);
    return {
        connected: !error,
        adminConfigured: isAdminConfigured()
    }
}

export function DatabaseStatus() {
    // ... State logic
    const [status, setStatus] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const checkStatus = async () => {
        setLoading(true);
        const configured = isClientConfigured();
        if (!configured) {
            setStatus({ configured: false, connected: false, adminConfigured: false, error: "Client env vars missing" });
            setLoading(false);
            return;
        }
        const serverStatus = await checkServerStatus();
        setStatus({
            configured: true,
            ...serverStatus
        });
        setLoading(false);
    }
    
    useEffect(() => { checkStatus(); }, []);

    // ... your JSX for rendering status
    return (
        <div>
           {/* Your JSX to display the `status` state */}
        </div>
    )
}
