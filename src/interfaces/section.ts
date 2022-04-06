export interface Section {
    //course ID
    id: number;
    //days of course ['M', 'W', 'F']
    days: string[];
    //class times XX:XX
    startTime: string;
    endTime: string;
}
