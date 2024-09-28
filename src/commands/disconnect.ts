import {ChatInputCommandInteraction} from 'discord.js';
import {SlashCommandBuilder} from '@discordjs/builders';
import {TYPES} from '../types.js';
import {inject, injectable} from 'inversify';
import PlayerManager from '../managers/player.js';
import Command from './index.js';

@injectable()
export default class implements Command {
  public readonly slashCommand = new SlashCommandBuilder()
    .setName('disconnect')
    .setDescription('pause and disconnect Lucio');

  public requiresVC = true;

  private readonly playerManager: PlayerManager;

  constructor(@inject(TYPES.Managers.Player) playerManager: PlayerManager) {
    this.playerManager = playerManager;
  }

  public async execute(interaction: ChatInputCommandInteraction) {
    const player = this.playerManager.get(interaction.guild!.id);

    if (!player.voiceConnection) {
      throw new Error('not connected');
    }

    player.disconnect();

    await interaction.reply('That went great, let\'s do it again sometime! Disconnecting');
  }
}
