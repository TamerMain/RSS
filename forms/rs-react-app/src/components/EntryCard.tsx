import { type EntryStoreData } from '@/store/formEntriesSlice';

interface EntryCardProps {
  data: EntryStoreData;
  lastEntry: boolean;
}
function EntryCard({ data, lastEntry }: EntryCardProps) {
  return (
    <div className="rounded-lg">
      <div
        className={`flex flex-col gap-2 ${lastEntry ? 'animate-bg-zinc' : 'bg-zinc-100'} rounded-lg p-4`}
      >
        <div className="relative font-mono text-sm bg-neutral-800 rounded-lg p-4 shadow-lg overflow-x-auto">
          {lastEntry && (
            <div className="absolute right-5 text-red-400 animate-pulse">
              ● New
            </div>
          )}
          <div className="text-[#d4d4d4]">
            <span className="text-[#c586c0]">{`{`}</span>

            <div className="ml-4 space-y-0.5">
              <div>
                <span className="text-[#9cdcfe]">&quot;name&quot;</span>
                <span className="text-[#d4d4d4]">: </span>
                <span className="text-[#ce9178]">&quot;{data.name}&quot;</span>
                <span className="text-[#d4d4d4]">,</span>
              </div>

              <div>
                <span className="text-[#9cdcfe]">&quot;email&quot;</span>
                <span className="text-[#d4d4d4]">: </span>
                <span className="text-[#ce9178]">&quot;{data.email}&quot;</span>
                <span className="text-[#d4d4d4]">,</span>
              </div>

              <div>
                <span className="text-[#9cdcfe]">&quot;age&quot;</span>
                <span className="text-[#d4d4d4]">: </span>
                <span className="text-[#b5cea8]">{data.age}</span>
                <span className="text-[#d4d4d4]">,</span>
              </div>

              <div>
                <span className="text-[#9cdcfe]">&quot;gender&quot;</span>
                <span className="text-[#d4d4d4]">: </span>
                <span className="text-[#ce9178]">
                  &quot;{data.gender}&quot;
                </span>
                <span className="text-[#d4d4d4]">,</span>
              </div>

              <div>
                <span className="text-[#9cdcfe]">&quot;password&quot;</span>
                <span className="text-[#d4d4d4]">: </span>
                <span className="text-[#ce9178]">
                  &quot;{data.password}&quot;
                </span>
                <span className="text-[#d4d4d4]">,</span>
              </div>

              <div>
                <span className="text-[#9cdcfe]">
                  &quot;passwordConfirm&quot;
                </span>
                <span className="text-[#d4d4d4]">: </span>
                <span className="text-[#ce9178]">
                  &quot;{data.passwordConfirm}&quot;
                </span>
                <span className="text-[#d4d4d4]">,</span>
              </div>

              <div>
                <span className="text-[#9cdcfe]">&quot;country&quot;</span>
                <span className="text-[#d4d4d4]">: </span>
                <span className="text-[#ce9178]">
                  &quot;{data.country}&quot;
                </span>
                <span className="text-[#d4d4d4]">,</span>
              </div>

              <div>
                <span className="text-[#9cdcfe]">
                  &quot;termsAccepted&quot;
                </span>
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
