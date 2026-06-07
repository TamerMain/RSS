import { type EntryStoreData } from '@/store/formEntriesSlice';

interface EntryCardProps {
  data: EntryStoreData;
  lastEntry: boolean;
}
function EntryCard({ data, lastEntry }: EntryCardProps) {
  return (
    <div
      className={`rounded-lg`}
    >
      <div
        className={`flex flex-col gap-2 ${lastEntry ? 'animate-bg-zinc' : 'bg-zinc-100'} rounded-lg p-4`}
      >
        <div className=" font-mono text-sm bg-neutral-800 rounded-lg p-4 shadow-lg overflow-x-auto">
          <div className="relative text-[#d4d4d4]">
            {lastEntry && (
              <div className="absolute right-0 text-red-400 animate-pulse">
                ● New
              </div>
            )}
            <span className="text-[#c586c0]">{`{`}</span>

            <div className="ml-4 space-y-0.5">
              <div>
                <span className="text-[#9cdcfe]">"name"</span>
                <span className="text-[#d4d4d4]">: </span>
                <span className="text-[#ce9178]">"{data.name}"</span>
                <span className="text-[#d4d4d4]">,</span>
              </div>

              <div>
                <span className="text-[#9cdcfe]">"email"</span>
                <span className="text-[#d4d4d4]">: </span>
                <span className="text-[#ce9178]">"{data.email}"</span>
                <span className="text-[#d4d4d4]">,</span>
              </div>

              <div>
                <span className="text-[#9cdcfe]">"age"</span>
                <span className="text-[#d4d4d4]">: </span>
                <span className="text-[#b5cea8]">{data.age}</span>
                <span className="text-[#d4d4d4]">,</span>
              </div>

              <div>
                <span className="text-[#9cdcfe]">"gender"</span>
                <span className="text-[#d4d4d4]">: </span>
                <span className="text-[#ce9178]">"{data.gender}"</span>
                <span className="text-[#d4d4d4]">,</span>
              </div>

              <div>
                <span className="text-[#9cdcfe]">"password"</span>
                <span className="text-[#d4d4d4]">: </span>
                <span className="text-[#ce9178]">"{data.password}"</span>
                <span className="text-[#d4d4d4]">,</span>
              </div>

              <div>
                <span className="text-[#9cdcfe]">"passwordConfirm"</span>
                <span className="text-[#d4d4d4]">: </span>
                <span className="text-[#ce9178]">"{data.passwordConfirm}"</span>
                <span className="text-[#d4d4d4]">,</span>
              </div>

              <div>
                <span className="text-[#9cdcfe]">"country"</span>
                <span className="text-[#d4d4d4]">: </span>
                <span className="text-[#ce9178]">"{data.country}"</span>
                <span className="text-[#d4d4d4]">,</span>
              </div>

              <div>
                <span className="text-[#9cdcfe]">"termsAccepted"</span>
                <span className="text-[#d4d4d4]">: </span>
                <span
                  className={
                    data.termsAccepted ? 'text-[#4ec9b0]' : 'text-[#ce9178]'
                  }
                >
                  {data.termsAccepted ? 'true' : 'false'}
                </span>
              </div>
            </div>

            <span className="text-[#c586c0]">{`}`}</span>
          </div>
        </div>
        <div>
          <img src={`${data.imageUpload}`} alt="Image" className="rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default EntryCard;
