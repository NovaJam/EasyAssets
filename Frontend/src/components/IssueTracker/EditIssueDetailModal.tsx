import { useState, useEffect } from 'react';
import { issue } from '../../types/issue';

type IssueDetailsProps = {
    selectedIssue: issue;
    onClose: () => void;
    onSave: (updated: issue) => void;
};

const EditIssueDetailModal = ({ selectedIssue, onClose, onSave }: IssueDetailsProps) => {

    const [status, setStatus] = useState<'open' | 'resolved'>(selectedIssue.status);
    const [resolutionMessage, setResolutionMessage] = useState(selectedIssue.resolutionMessage || '');

    useEffect(() => {
        setStatus(selectedIssue.status);
        setResolutionMessage(selectedIssue.resolutionMessage || '');
    }, [selectedIssue]);

    const handleSave = () => {
        const updatedIssue: issue = {
            ...selectedIssue,
            status,
            resolutionMessage: status === 'resolved' ? resolutionMessage : '',
        };
        onSave(updatedIssue);
    };

    
    return (
        <div className="space-y-3">
            <div>
                <div className="flex items-center gap-2">
                    <label className="font-medium">Mark Resolved:</label>
                    {selectedIssue.status === 'open' && (
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only"
                                checked={status === 'resolved'}
                                onChange={() => setStatus(status === 'open' ? 'resolved' : 'open')}
                            />
                            <div className={`w-11 h-6  rounded-full shadow-inner relative transition ${status === 'resolved' ? 'bg-blue-500' : 'bg-gray-300'}`}>
                                <div
                                    className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 left-0.5 transition-transform ${status === 'resolved' ? 'translate-x-5 bg-white' : ''
                                        }`}
                                ></div>
                            </div>
                        </label>
                    )}

                </div>
                {status !== 'resolved' && <p className='text-sm text-gray-500'>Resolution message is visible when resolved...</p>
                }
            </div>
            {status === 'resolved' && (
                <div>
                    <label className="block font-medium mb-1">Resolution Message(Optional):</label>
                    <textarea
                        value={resolutionMessage}
                        onChange={(e) => setResolutionMessage(e.target.value)}
                        rows={2}
                        placeholder="Short message..."
                        className="w-full px-3 py-2 border border-gray-200 outline-none focus:border-blue-400 rounded-lg text-sm resize-none"
                    />
                </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
                <button
                    className="px-4 py-2 bg-gray-400 rounded-md text-sm text-white"
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-600"
                    onClick={handleSave}
                    disabled ={status === "open"} // Add && resolutionMessage === "" If resolutionMessage also needed
                >
                    Update
                </button>
            </div>

        </div>
    );
};

export default EditIssueDetailModal;
