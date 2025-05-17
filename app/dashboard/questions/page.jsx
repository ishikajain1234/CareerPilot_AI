import { BadgeInfo, Mic, Video, Star, ClipboardList } from "lucide-react";
import features from "@/utils/interviewFeatures"; // import the refactored data

const icons = [BadgeInfo, ClipboardList, Mic, Star, Video, Mic, Star];

const InterviewFeatures = () => {
  return (
    <section className="bg-gradient-to-br from-sky-50 to-white py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          🚀 Smart Interview Features
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={feature.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border border-gray-100"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 bg-sky-100 rounded-full">
                    <Icon className="text-sky-600 w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InterviewFeatures;
