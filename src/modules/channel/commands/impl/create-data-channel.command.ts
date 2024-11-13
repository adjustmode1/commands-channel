export class CreateDataChannelCommand {
  constructor(
    public readonly workspaceId: string,
    public readonly name: string,
  ) {}
}
