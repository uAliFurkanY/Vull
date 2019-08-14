import { Command } from 'axoncore';

class Off extends Command {
    constructor(module) {
        super(module);
        this.label = 'on';
        this.aliases = ['enable'];

        this.infos = {
            owners: ['Null'],
            description: 'Disable modlogs',
            usage: 'on',
        };

        this.isSubcmd = true;

        this.permissions.serverAdmin = true;
        this.options.guildOnly = true;
    }

    async execute( { msg, guildConf } ) {
        if (guildConf.modLogStatus) return this.sendError(msg.channel, this.axon.LangClass.fetchSnippet('modlog_nvr_enabled', { guildConf } ) );
        guildConf.modLogStatus = true;
        this.axon.updateGuildConf(msg.channel.guild.id, guildConf);
        guildConf = await this.axon.getGuildConf(msg.channel.guild.id);
        if (!guildConf.modLogStatus) return this.sendError(msg.channel, this.axon.LangClass.fetchSnippet('db_upd_err', { guildConf } ) );
        return this.sendSuccess(msg.channel, this.axon.LangClass.fetchSnippet('modlog_enabled', { guildConf } ) );
    }
}

export default Off;
