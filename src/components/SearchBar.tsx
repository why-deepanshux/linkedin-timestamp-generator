import { useState } from "react";
import { toast } from "react-toastify";

function SearchBar() {
    const [linkedinPostUrl , setLinkedinPostUrl] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLinkedinPostUrl(event.target.value)
    }

    function isLinkedInUrl(url: string): boolean {
      try {
        const parsed = new URL(url);
        return parsed.hostname.includes("linkedin.com");
      } catch {
        return false;
      }
    }

    function extractLinkedInPostId(url: string): string | null {
      let match = url.match(/activity-(\d+)-/);
      if (match) return match[1];
      match = url.match(/urn:li:activity:(\d+)/);
      if (match) return match[1];

      return null; // not found
    }

    const handleSubmit = () => {
      if (linkedinPostUrl.trim().length === 0) {
        toast.error("Input is empty !!", { position: "top-center" });
        setResult('');
        return;
      }

      if (!isLinkedInUrl(linkedinPostUrl)) {
        toast.error("Provided URL is not a valid LinkedIn URL", {
          position: "top-center",
        });
        setResult('');
        return;
      }

      setLoading(true); // start loader
      setTimeout(() => {
        // simulate async work, replace with real API later
        const activityId = extractLinkedInPostId(linkedinPostUrl);
        if (!activityId) {
          toast.error("Provided URL does not contain post activity Id", {
            position: "top-center",
          });
          setLoading(false);
          setResult('');
          return;
        }

        const activityIdBinary = BigInt(activityId).toString(2);
        const timestampBinary = activityIdBinary.slice(0, 41);
        const unixTime = BigInt("0b" + timestampBinary);
        const date = new Date(Number(unixTime));

        const UTC = date.toUTCString();
        const IST = date.toISOString();

        const result = `
      UTC Time : ${UTC}
      IST Time : ${IST}
    `;
        setResult(result);
        setLoading(false); // stop loader
      }, 1000);
    };

    return (
      <div className="w-full md:h-full flex flex-col justify-center gap-6">
        <div className="text-2xl font-bold">
          <div className="text-5xl text-[#0077B5] mb-4">Linked In</div>
          Relative Timestamps Confuses You ? <br /> Convert them and get the
          actual Date
        </div>
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <input
            type="text"
            value={linkedinPostUrl}
            onChange={handleChange}
            placeholder="Paste Linked In Post url here"
            className="bg-white border-2 border-black rounded-lg flex-1 px-4 py-1 shadow-md w-full"
          />
          <button
            onClick={handleSubmit}
            className="bg-[#0077B5] text-white px-4 py-1 rounded-lg text-lg shadow-xl hover:scale-105"
          >
            Submit
          </button>
        </div>
        <div className="flex w-full md:min-h-1/2 items-center gap-2 justify-between">
          <div className=" w-full md:w-2/3 h-full flex flex-col bg-gray-100 border-2 p-4 rounded-lg shadow-md z-10">
            <div>Results will be shown here ....</div>
            {loading ? (
              <div className="flex justify-center items-center flex-1">
                <div className="w-8 h-8 border-4 border-[#0077B5] border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-2 text-[#0077B5] font-medium">
                  Processing...
                </span>
              </div>
            ) : (
              <div className="mt-2 whitespace-pre-line">{result}</div>
            )}
          </div>
        </div>
      </div>
    );
}
export default SearchBar;
