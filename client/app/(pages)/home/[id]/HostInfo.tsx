import {Avatar, AvatarIcon} from "@nextui-org/react";
import {User} from "shared/models/user";

interface HostInfoProps {
    hostUser: User | null;
}

export function HostInfo({ hostUser }: HostInfoProps) {
    return (
        <div className="flex flex-row gap-6">
            <Avatar
                src={hostUser?.avatarUrl || "/default-avatar.png"}
                icon={<AvatarIcon/>}
                classNames={{
                    base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                    icon: "text-black/80",
                }}
            />
            <div className="">
                <p className={"font-bold"}>Hosted by {hostUser?.name}</p>
                <p className={"text-muted-foreground text-sm"}>5 months hosting</p>
            </div>
        </div>
    )
}