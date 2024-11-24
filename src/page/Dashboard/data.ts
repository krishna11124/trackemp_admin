export interface DashboardData {
  userId: string;
  tasksCompleted: number;
  tasksInProgress: number;
  performanceScore: number;
  sno:number,
  timeUtilization: string;
  averageCompletionTime: string;
  performanceAnalysis: {
    issueId: string;
    summary: string;
    status: string;
    activityTimeline: string;
    changeLog: {
      created: string;
      changes: {
        field: string;
        from: string;
        to: string;
      }[];
    }[];
    analysis: string;
  }[];
  recommendations: {
    userId: string;
    topRecommendations: string[];
  }[];
  reopenedTickets: number;
}
