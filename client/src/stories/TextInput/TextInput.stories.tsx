import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TextInput } from './TextInput';

export default {
  title: 'TextInput',
  component: TextInput,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => (
  <TextInput {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  id: 'address',
  title: 'Address',
  description: 'Address is here',
  type: 'text',
  onChange: () => console.log('test'),
};

export const Secondary = Template.bind({});
Secondary.args = {
  id: 'ideas',
  title: 'Ideas',
  description: 'Your ideas here',
  type: 'text',
  onChange: () => console.log('test'),
};
