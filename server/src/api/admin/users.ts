import { Crud } from '../crud-service';

export class Users extends Crud{
    userStat = async (ctx) => {
        const users = await this.model.find({isAdmin: false}).lean();
        const stats = {
            new: 0,
            send: 0,
            edit: 0,
            accepted: 0,
            declined: 0,
            all: users.length
        }

        for (const user of users) {
            switch (user.documents.status) {
                case 'new': 
                    stats.new ++;
                    break;
                case 'edit': 
                    stats.edit ++;
                    break;
                case 'send': 
                    stats.send ++;
                    break;
                case 'decline': 
                    stats.declined ++;
                    break;
                case 'accept': 
                    stats.accepted ++;
                    break;
            }
        }

        ctx.body = {
            result: true,
            data: stats
        }
    }
}