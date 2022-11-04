import { Injectable, Logger } from '@nestjs/common'
import { Cron, Timeout, Interval } from '@nestjs/schedule'
import { PrismaService } from './prisma.service';

/*
	https://docs.nestjs.com/techniques/task-scheduling

	PATTERN FOR CRON TIME :
	* * * * * *
	| | | | | |
	| | | | | day of week
	| | | | months
	| | | day of month
	| | hours
	| minutes
	seconds (optional)

	EXEMPLE :
	* * * * * * => Every second
	45 * * * * * => every minute, on the 45th second
	0 10 * * * * => every hour, at the start of the 10th minute
	0 * /30 9-17 * * * => every 30 minutes between 9am and 5pm (* et /30 doivent etre colles ici peut pas car ca met fin au commentaire) 
	0 30 11 * * 1-5 => Monday to Friday at 11:30am

	Use JavaScript date arithmetic to schedule
	jobs relative to the current date.
	For example, @Cron(new Date(Date.now() + 10 * 1000))
	to schedule a job to run 10 seconds after the app starts.
*/

@Injectable()
export class CronService {

	private _delay: number = 0;

	constructor(delay: number, private Prisma : PrismaService)
	{
		this._delay = delay;
		if (this._delay === undefined)
			this._delay = 0;
	}
	@Interval(1)
	handleInterval(){
		console.log("cron interval")
	}

	test(){
		let i = 0;
		while (i < this._delay)
		{
			this.handleInterval();
			i++;
		}
		console.log("test termine");
	}
}