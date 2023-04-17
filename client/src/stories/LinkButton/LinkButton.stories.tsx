import { ComponentStory, ComponentMeta } from '@storybook/react';

import { LinkButton } from './LinkButton';

export default {
  title: 'LinkButton',
  component: LinkButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LinkButton>;

const Template: ComponentStory<typeof LinkButton> = (args) => (
  <LinkButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  classType: 'profile',
  svg: (
    <div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-6 h-6'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
        />
      </svg>
    </div>
  ),
  text: 'My profile',
  route: '',
};

export const Secondary = Template.bind({});
Secondary.args = {
  classType: 'bookings',
  svg: (
    <div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-6 h-6'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
        />
      </svg>
    </div>
  ),
  text: 'My bookings',
  route: 'bookings',
};
