import { useState } from "react";

export default function HoursRow(args) {
    let day = args.day;
    let open: string = args.open;
    let close: string = args.close;
    let check = !(open === '' && close === '');

    const [isOpen, setIsOpen] = useState(check);
    const [opening, setOpening] = useState(open);
    const [closing, setClosing] = useState(close);

    return (
        <div className="my-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">                        
            <div className="sm:col-span-2">
                <div className="mt-8 flex items-center ps-4 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-400">
                    <input 
                        id={`${day}Checkbox`}
                        type="checkbox" 
                        name={`${day}-checkbox`}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={(event) => setIsOpen(event.target.checked)}
                        defaultChecked={isOpen}
                    />
                    <label htmlFor={`${day}-checkbox`} className="w-full pt-4 pb-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{day}</label>
                </div>
            </div>

            <div className="sm:col-span-4">
                <label htmlFor={`${day}-open`} className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                    Opening
                </label>
                <div className="mt-2">
                    <input
                        disabled={!isOpen}
                        type="time"
                        name={`${day}-open`}
                        id={`${day}Open`}
                        className="dark:bg-gray-900 px-2 block w-full rounded-md border-0 py-1.5 dark:disabled:bg-gray-800 disabled:bg-gray-200 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-400 sm:text-sm sm:leading-6"
                        onChange={(event) => setOpening(event.target.value)}
                        defaultValue={open}
                    />
                </div>
            </div>

            <div className="sm:col-span-4">
                <label htmlFor={`${day}-close`} className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                    Closing
                </label>
                <div className="mt-2">
                    <input
                        disabled={!isOpen}
                        type="time"
                        name={`${day}-close`}
                        id={`${day}Close`}
                        className="dark:bg-gray-900 px-2 block w-full rounded-md border-0 py-1.5 dark:disabled:bg-gray-800 disabled:bg-gray-200 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-400 sm:text-sm sm:leading-6"
                        onChange={(event) => setClosing(event.target.value)}
                        defaultValue={close}
                    />
                </div>
            </div>

            <div className="sm:col-span-2">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"> Total Hours </label>
                <div className="mt-5 ps-4">
                    <h4>{getHours(isOpen, opening, closing)}</h4>
                </div>
            </div>
            
        </div>
    );
}

function getHours(isOpen, open, close) {
    if (isOpen) {
        let o = Date.parse(`1970/01/01 ${open}:00`);
        let c = Date.parse(`1970/01/01 ${close}:00`);
        let len = new Date(c - o);
        let hours = len.getUTCHours().toString() == 'NaN' ? '' : len.getUTCHours().toString();
        let mins = len.getUTCMinutes().toString() == 'NaN' ? '' : len.getUTCMinutes().toString();
        return `${hours.padStart(2,'0')}:${mins.padStart(2,'0')}`;
    }
    else {
        return '--:--';
    }
}