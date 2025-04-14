import { useState } from 'react';
import { issue } from '../../types/issue';
import IssueCard from './IssueCard';
import CommonModal from './CommonModal';
import EditIssueDetailModal from './EditIssueDetailModal';

const IssuesList = ({ issuesList }: { issuesList: issue[] }) => {

  const [selectedIssue, setSelectedIssue] = useState<issue | null>(null);
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const isEditable = selectedIssue?.status === "open";
  const handleCardClick = (issue: issue) => {
    console.log(issue);
    setSelectedIssue(issue);
  }

  const handleSave = (updatedIssue: issue) => {
    // TODO: Save to server or update locally
    console.log("Updated Issue:", updatedIssue);
    setSelectedIssue(null); // Close modal
  };

  const handleClose = () => {
    setSelectedIssue(null);
    setShowEdit(false);
  }
  const imagePlaceholder: string = "https://skala.or.id/wp-content/uploads/2024/01/dummy-post-square-1-1.jpg";


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {
        issuesList.map((currentIssue, index) => (
          <IssueCard issue={currentIssue} key={index} onCardClick={() => handleCardClick(currentIssue)} />
        ))
      }

      {selectedIssue && (
        <CommonModal isOpen={!!selectedIssue} onClose={handleClose}>
          <div className="space-y-1 max-h-[80vh] overflow-y-auto pr-1 scroll-hidden">
            <h2 className="text-xl font-semibold text-gray-800">Issue Details</h2>

            <div className="flex flex-col md:flex-row gap-6">

              <div className="md:w-1/2 w-full">
                <img
                  src={imagePlaceholder}
                  alt="Issue"
                  className="w-full h-56 object-contain rounded border border-gray-200 bg-gray-100"
                />
              </div>

              <div className="flex flex-col justify-start md:w-1/2 w-full space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-medium">Asset ID:</span> {selectedIssue.assetId}
                </p>
                <p>
                  <span className="font-medium">Description:</span> {selectedIssue.description}
                </p>
                <p>
                  <span className="font-medium">Reported by:</span> {selectedIssue.reportedBy}
                </p>

                {!showEdit ? (
                  isEditable ? (
                    <button
                      onClick={() => setShowEdit(true)}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                  ) : (
                    <p>
                      <span className="font-medium">Status:</span> {selectedIssue.status}
                    </p>
                  )
                ) : (
                  <EditIssueDetailModal
                    selectedIssue={selectedIssue}
                    onClose={() => setShowEdit(false)}
                    onSave={(updatedIssue) => {
                      handleSave(updatedIssue);
                      setShowEdit(false);
                    }}
                  />
                )}
              </div>
            </div>
          </div>

        </CommonModal>
      )}

    </div>
  );
}

export default IssuesList