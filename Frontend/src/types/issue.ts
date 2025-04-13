export type issue = {
    issueId: string;
    assetId: string;
    reportedBy: string;
    description: string;
    status: 'open' | 'resolved';
    createdAt: Date;
    updatedAt: Date;
    resolutionMessage?:string
}