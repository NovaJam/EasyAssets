import { issue } from '../../types/issue'

function IssueCard({ issue, onCardClick }: { issue: issue, onCardClick:()=>void; }) {
    const imagePlaceholder: string = "https://skala.or.id/wp-content/uploads/2024/01/dummy-post-square-1-1.jpg";
    return (
        <div
        onClick={onCardClick}
            className="bg-white border border-gray-100 rounded-lg p-4 flex flex-col gap-2 hover:shadow-lg transition-shadow cursor-pointer"
            >
            <div className="w-full h-40 bg-gray-200 rounded overflow-hidden flex items-center justify-center">
                <img
                    src={imagePlaceholder}
                    alt="Issue"
                    className="max-w-full max-h-full object-contain object-center"
                />
            </div>

            <div className="flex flex-col gap-1 mt-2">
                <div className='flex flex-row gap-1'>
                    <p className="text-sm font-medium text-gray-700">AssetId:</p>
                    <p className="text-sm text-gray-900">{issue.assetId}</p>
                </div>
                <p className="text-sm font-medium text-gray-700 mt-1">Description:</p>
                <p className="text-sm text-gray-600 truncate">{issue.description}</p>

                <div className='flex flex-row gap-1'>
                    <p className="text-sm font-medium text-gray-700">Reported by:</p>
                    <p className="text-sm text-gray-900">{issue.reportedBy}</p>
                </div>
            </div>
        </div>
    )
}

export default IssueCard