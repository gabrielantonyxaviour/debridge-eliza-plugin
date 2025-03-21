import type { Plugin } from '@elizaos/core';
import {
  logger,
} from '@elizaos/core';
import { z } from 'zod';
import createBridgeTx from './actions/createBridgeTx';
import cancelOrder from './actions/cancelOrder';
import viewOrderStatus from './actions/viewOrderStatus';
import { debridgeSupportedChainsProvider } from './providers/supportedChains';
import { configSchema } from './types';

export const debridgePlugin: Plugin = {
  name: 'deBridge',
  description: 'ElizaOS plugin for deBridge',
  config: {
    DEBRIDGE_PRIVATE_KEY: process.env.DEBRIDGE_PRIVATE_KEY,
    DEBRIDGE_API_KEY: process.env.DEBRIDGE_API_KEY,
  },
  async init(config: Record<string, string>) {
    try {
      const validatedConfig = await configSchema.parseAsync(config);
      for (const [key, value] of Object.entries(validatedConfig)) {
        if (value) process.env[key] = value;
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(
          `Invalid plugin configuration: ${error.errors.map((e) => e.message).join(', ')}`
        );
      }
      throw error;
    }
  },
  // tests: [
  //   {
  //     name: 'plugin_starter_test_suite',
  //     tests: [
  //       {
  //         name: 'example_test',
  //         fn: async (runtime) => {
  //           logger.debug('example_test run by ', runtime.character.name);
  //           // Add a proper assertion that will pass
  //           if (runtime.character.name !== 'Eliza') {
  //             throw new Error(
  //               `Expected character name to be "Eliza" but got "${runtime.character.name}"`
  //             );
  //           }
  //           // Verify the plugin is loaded properly
  //           const service = runtime.getService('starter');
  //           if (!service) {
  //             throw new Error('Starter service not found');
  //           }
  //           // Don't return anything to match the void return type
  //         },
  //       },
  //       {
  //         name: 'should_have_hello_world_action',
  //         fn: async (runtime) => {
  //           // Check if the hello world action is registered
  //           // Look for the action in our plugin's actions
  //           // The actual action name in this plugin is "helloWorld", not "hello"
  //           const actionExists = debridgePlugin.actions.some((a) => a.name === 'HELLO_WORLD');
  //           if (!actionExists) {
  //             throw new Error('Hello world action not found in plugin');
  //           }
  //         },
  //       },
  //     ],
  //   },
  // ],
  // routes: [
  //   {
  //     path: '/helloworld',
  //     type: 'GET',
  //     handler: async (_req: any, res: any) => {
  //       // send a response
  //       res.json({
  //         message: 'Hello World!',
  //       });
  //     },
  //   },
  // ],
  events: {
    MESSAGE_RECEIVED: [
      async (params) => {
        logger.debug('MESSAGE_RECEIVED event received');
        // print the keys
        logger.debug(Object.keys(params));
      },
    ],
    VOICE_MESSAGE_RECEIVED: [
      async (params) => {
        logger.debug('VOICE_MESSAGE_RECEIVED event received');
        // print the keys
        logger.debug(Object.keys(params));
      },
    ],
    WORLD_CONNECTED: [
      async (params) => {
        logger.debug('WORLD_CONNECTED event received');
        // print the keys
        logger.debug(Object.keys(params));
      },
    ],
    WORLD_JOINED: [
      async (params) => {
        logger.debug('WORLD_JOINED event received');
        // print the keys
        logger.debug(Object.keys(params));
      },
    ],
  },
  services: [],
  actions: [createBridgeTx, cancelOrder, viewOrderStatus],
  providers: [debridgeSupportedChainsProvider],
};

// Add debugging info to help understand why tests aren't running
{
  const debugPlugin = () => {
    // Add this temporary code to print info about the tests
    // Will be removed after debugging
    logger.debug('DEBUG: PLUGIN STRUCTURE:');
    logger.debug('Plugin name:', debridgePlugin.name);
    logger.debug('Tests array exists:', !!debridgePlugin.tests);
    logger.debug('Tests array length:', debridgePlugin.tests?.length);
    if (debridgePlugin.tests && debridgePlugin.tests.length > 0) {
      logger.debug('First test suite name:', debridgePlugin.tests[0].name);
      logger.debug('First test suite has tests array:', !!debridgePlugin.tests[0].tests);
      logger.debug('First test suite tests length:', debridgePlugin.tests[0].tests?.length);
      if (debridgePlugin.tests[0].tests && debridgePlugin.tests[0].tests.length > 0) {
        logger.debug('First test name:', debridgePlugin.tests[0].tests[0].name);
        logger.debug('First test has fn:', !!debridgePlugin.tests[0].tests[0].fn);
      }
    }
  };
  // Call function but don't display in IDE completion
  debugPlugin();
}

export default debridgePlugin;
