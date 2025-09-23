import React from 'react';
import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

interface BasicScoreViewProps {
  feedback: any;
}

const BasicScoreView: React.FC<BasicScoreViewProps> = ({ feedback }) => {
  const overallScore = feedback.overallScore || feedback.score || 75;
  const atsScore = feedback.ATS?.score || feedback.score || 75;

  // Generate realistic feedback based on actual scores
  const getScoreMessage = (score: number) => {
    if (score < 40) {
      return "Your resume needs significant improvement to be competitive in the job market.";
    } else if (score < 60) {
      return "Good foundation, but there are several areas that need strengthening.";
    } else if (score < 80) {
      return "Solid resume with good potential. A few improvements could make it excellent.";
    } else {
      return "Excellent resume! You're well-positioned for your target role.";
    }
  };

  const getATSMessage = (score: number) => {
    if (score < 50) {
      return "Your resume may struggle with Applicant Tracking Systems. Consider adding more relevant keywords.";
    } else if (score < 70) {
      return "Moderate ATS compatibility. Some optimization could improve your chances.";
    } else {
      return "Good ATS compatibility! Your resume should pass through most tracking systems.";
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Score Display */}
      <div className="bg-white rounded-2xl shadow-md w-full p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
          <div className="flex-shrink-0">
            <ScoreGauge score={overallScore} />
          </div>
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold">Your Resume Score</h2>
            <p className="text-sm text-gray-600 mb-2">
              {getScoreMessage(overallScore)}
            </p>
            <p className="text-xs text-gray-500">
              Sign in for detailed insights and improvement strategies.
            </p>
          </div>
        </div>
      </div>

      {/* Basic ATS Score */}
      <div className="bg-gradient-to-b from-blue-50 to-white rounded-2xl shadow-md w-full p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
          <img 
            src={atsScore >= 70 ? "/icons/ats-good.svg" : atsScore >= 50 ? "/icons/ats-warning.svg" : "/icons/ats-bad.svg"} 
            alt="ATS Score Icon" 
            className="w-8 h-8 flex-shrink-0" 
          />
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-semibold">ATS Compatibility</h3>
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
              <ScoreBadge score={atsScore} />
            </div>
          </div>
        </div>
        <p className="text-gray-600 text-sm text-center sm:text-left">
          {getATSMessage(atsScore)}
        </p>
      </div>

      {/* Quick Tips Preview */}
      <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-3">Quick Insights</h3>
        <div className="space-y-3">
          {feedback.strengths?.slice(0, 2).map((strength: string, index: number) => (
            <div key={index} className="flex items-start gap-3 text-sm">
              <img src="/icons/check.svg" alt="Check" className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span className="text-green-700 leading-relaxed">{strength}</span>
            </div>
          ))}
          {feedback.improvements?.slice(0, 1).map((improvement: string, index: number) => (
            <div key={index} className="flex items-start gap-3 text-sm">
              <img src="/icons/warning.svg" alt="Warning" className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span className="text-orange-600 leading-relaxed">{improvement}</span>
            </div>
          ))}
          <div className="flex items-start gap-3 text-sm">
            <img src="/icons/info.svg" alt="Info" className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span className="text-gray-600 leading-relaxed">+{Math.max(0, (feedback.improvements?.length || 3) - 1)} more improvement suggestions available</span>
          </div>
        </div>
      </div>

      {/* Score-based Call to Action */}
      {overallScore < 60 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <img src="/icons/warning.svg" alt="Warning" className="w-6 h-6 flex-shrink-0" />
            <h3 className="text-lg font-semibold text-red-800">Action Required</h3>
          </div>
          <p className="text-red-700 text-sm leading-relaxed">
            Your resume score indicates significant improvements are needed to be competitive. 
            Sign in to get detailed analysis and step-by-step improvement guidance.
          </p>
        </div>
      )}
    </div>
  );
};

export default BasicScoreView;