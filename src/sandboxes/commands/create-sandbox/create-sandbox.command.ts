import { CommandProps } from '@libs/ddd/command.base';

export class CreateSandboxCommand {
  readonly name: string;

  constructor(props: CommandProps<CreateSandboxCommand>) {
    this.name = props.name;
  }
}
