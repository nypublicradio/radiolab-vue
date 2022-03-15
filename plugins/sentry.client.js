import { defineNuxtPlugin, useRuntimeConfig } from '#app';
import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';

export default defineNuxtPlugin((nuxtApp) => {
    const { vueApp } = nuxtApp;

    const config = useRuntimeConfig();

    Sentry.init({
        app: [vueApp],
        dsn: config.SENTRY_DSN,
        integrations: [
            new Integrations.BrowserTracing({
                routingInstrumentation: Sentry.vueRouterInstrumentation(nuxtApp.$router),
                tracingOrigins: ['radiolab.org']
            })
        ],
        logErrors: false,
        debug: true,
        sampleRate: 1,
        tracesSampleRate: 1,
        environment: config.ENV || 'dev',
        beforeSend(event, hint) {
            return event;
        }
    });

    const defaults = {
        timeout: 2000,
        hooks: ['activate', 'mount', 'update']
    }
    vueApp.mixin(Sentry.createTracingMixins({
        ...defaults,
        trackComponents: true
    }));

    Sentry.attachErrorHandler(vueApp, {
        ...defaults,
        logErrors: false,
        attachProps: true,
        trackComponents: true,
    });

    return {
        provide: {
            sentrySetContext: (n, context) => Sentry.setContext(n, context),
            sentrySetUser: (user) => Sentry.setUser(user),
            sentrySetTag: (tagName, value) => Sentry.setTag(tagName, value),
            sentryAddBreadcrumb: (breadcrumb) => Sentry.addBreadcrumb(breadcrumb)
        }
    }
});
