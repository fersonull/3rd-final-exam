import { Badge } from "../ui/badge";

export default function TaskPriorityPill({ priority }) {
    const priorityVariantMap = {
        low: "success",
        normal: "ongoing",
        high: "destructive",
    };

    const variant = priorityVariantMap[priority] || "secondary";

    return (
        <Badge variant={variant}>
            {priority}
        </Badge>
    );
}