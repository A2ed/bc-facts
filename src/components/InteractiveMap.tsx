import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const InteractiveMap = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 w-full h-full bg-background">
      <div className="relative w-full md:w-2/3 h-[500px] md:h-[700px] border rounded-lg overflow-hidden bg-slate-100">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10426692.79853429!2d-131.7210845748769!3d54.72280693308092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537a66c7aa8e5815%3A0x1cbf82b2e90ebc41!2sBritish%20Columbia%2C%20Canada!5e0!3m2!1sen!2sus!4v1715728211379!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Map of British Columbia"
          className="absolute inset-0"
        ></iframe>
        <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-md text-xs">
          <p>Map of British Columbia</p>
        </div>
      </div>

      <div className="w-full md:w-1/3">
        <Card className="h-full">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">British Columbia</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Facts</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>British Columbia is Canada's westernmost province.</li>
                <li>It's known for its mountainous landscapes and Pacific coastline.</li>
                <li>The capital of British Columbia is Victoria, located on Vancouver Island.</li>
                <li>Vancouver is the largest city and a major cultural and economic center.</li>
                <li>The province is home to diverse ecosystems, from rainforests to desert-like regions.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveMap;
