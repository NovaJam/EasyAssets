import { useState } from "react"
import IssuesList from "../../components/IssueTracker/IssuesList";
import { issue } from "../../types/issue";
import { mockIssues } from "../../Mock/mockIssuesList";

const IssueTrackerDashboard = () => {

  const issuesMockData: issue[] = mockIssues;

  const [currentTab, setCurrentTab] = useState<"active" | "resolved">("active");
  return (
    <div className="w-full h-screen flex justify-end">
      <div className="w-full max-w-6xl bg-white flex flex-col h-full p-2">
        <div className="flex border-b border-gray-300 mb-4">
          <div
            className={`flex-1 text-lg pt-5 text-center font-semibold cursor-default ${currentTab === "active"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "border-b-2 border-none text-gray-400 hover:text-gray-700"
              }`}
            onClick={() => setCurrentTab("active")}
          >
            Active Issues
          </div>
          <div
            className={`flex-1 pt-5 text-lg text-center font-semibold cursor-default ${currentTab === "resolved"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "border-b-2 border-none text-gray-400 hover:text-gray-700"
              }`}
            onClick={() => setCurrentTab("resolved")}
          >
            Resolved Issues
          </div>
        </div>
        <div className="w-full overflow-y-auto custom-scroll">
          <IssuesList issuesList={ currentTab === "active" ? issuesMockData.filter((item:issue) => item.status === "open") :  issuesMockData.filter((item:issue) => item.status === "resolved")} />
        </div>
      </div>
    </div>
  )
}

export default IssueTrackerDashboard