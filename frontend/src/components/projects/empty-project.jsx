import { Empty, EmptyContent, EmptyMedia, EmptyTitle, EmptyDescription, EmptyHeader } from "../ui/empty";
import { IconFolderCode } from "@tabler/icons-react";

export default function EmptyProject({ children }) {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <IconFolderCode />
                </EmptyMedia>
                <EmptyTitle>
                    No Projects Yet
                </EmptyTitle>
                <EmptyDescription>
                    You haven't created any projects yet. Get started by creating your first project.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                {children}
            </EmptyContent>
        </Empty>
    )
}