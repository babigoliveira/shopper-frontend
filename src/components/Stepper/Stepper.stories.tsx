import type { Meta, StoryObj } from "@storybook/react";
import Stepper from "@/components/Stepper/Stepper";

const meta = {
  component: Stepper,
  args: {},
} satisfies Meta<typeof Stepper>;

type Story = StoryObj<typeof Stepper>;

export const Default: Story = {};

export default meta;
