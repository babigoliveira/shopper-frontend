import "react-toastify/dist/ReactToastify.css";
import type { Preview } from "@storybook/react";

import "../src/app/globals.css";
import {
  INITIAL_VIEWPORTS,
  MINIMAL_VIEWPORTS,
} from "@storybook/addon-viewport";
import { SWRConfig } from "swr";
import { ToastContainer } from "react-toastify";
import { faker } from "@faker-js/faker";

faker.seed(0);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        ...MINIMAL_VIEWPORTS,
      },
    },
  },

  render: (args, context) => {
    const Component = context.component!;

    return (
      <>
        <Component {...args} />
        <SWRConfig value={{ provider: () => new Map() }}>
          <ToastContainer position="bottom-right" closeOnClick draggable />
        </SWRConfig>
      </>
    );
  },

  tags: ["autodocs"],
};

export default preview;
