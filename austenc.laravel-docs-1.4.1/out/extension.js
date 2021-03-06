'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function activate(context) {
    let version = vscode.workspace.getConfiguration("laravelDocs").version;
    let baseUrl = version ? `https://laravel.com/docs/${version}/` : 'https://laravel.com/docs/';
    let laravelDocsApiAuthentication = vscode.commands.registerCommand('extension.laravelDocsApiAuthentication', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'api-authentication'));
    });
    context.subscriptions.push(laravelDocsApiAuthentication);
    let laravelDocsArtisan = vscode.commands.registerCommand('extension.laravelDocsArtisan', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'artisan'));
    });
    context.subscriptions.push(laravelDocsArtisan);
    let laravelDocsAuthentication = vscode.commands.registerCommand('extension.laravelDocsAuthentication', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'authentication'));
    });
    context.subscriptions.push(laravelDocsAuthentication);
    let laravelDocsAuthorization = vscode.commands.registerCommand('extension.laravelDocsAuthorization', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'authorization'));
    });
    context.subscriptions.push(laravelDocsAuthorization);
    let laravelDocsBilling = vscode.commands.registerCommand('extension.laravelDocsBilling', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'billing'));
    });
    context.subscriptions.push(laravelDocsBilling);
    let laravelDocsBlade = vscode.commands.registerCommand('extension.laravelDocsBlade', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'blade'));
    });
    context.subscriptions.push(laravelDocsBlade);
    let laravelDocsBroadcasting = vscode.commands.registerCommand('extension.laravelDocsBroadcasting', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'broadcasting'));
    });
    context.subscriptions.push(laravelDocsBroadcasting);
    let laravelDocsCache = vscode.commands.registerCommand('extension.laravelDocsCache', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'cache'));
    });
    context.subscriptions.push(laravelDocsCache);
    let laravelDocsCollections = vscode.commands.registerCommand('extension.laravelDocsCollections', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'collections'));
    });
    context.subscriptions.push(laravelDocsCollections);
    let laravelDocsConfiguration = vscode.commands.registerCommand('extension.laravelDocsConfiguration', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'configuration'));
    });
    context.subscriptions.push(laravelDocsConfiguration);
    let laravelDocsConsoleTests = vscode.commands.registerCommand('extension.laravelDocsConsoleTests', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'console-tests'));
    });
    context.subscriptions.push(laravelDocsConsoleTests);
    let laravelDocsContainer = vscode.commands.registerCommand('extension.laravelDocsContainer', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'container'));
    });
    context.subscriptions.push(laravelDocsContainer);
    let laravelDocsContracts = vscode.commands.registerCommand('extension.laravelDocsContracts', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'contracts'));
    });
    context.subscriptions.push(laravelDocsContracts);
    let laravelDocsContributions = vscode.commands.registerCommand('extension.laravelDocsContributions', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'contributions'));
    });
    context.subscriptions.push(laravelDocsContributions);
    let laravelDocsControllers = vscode.commands.registerCommand('extension.laravelDocsControllers', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'controllers'));
    });
    context.subscriptions.push(laravelDocsControllers);
    let laravelDocsCsrf = vscode.commands.registerCommand('extension.laravelDocsCsrf', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'csrf'));
    });
    context.subscriptions.push(laravelDocsCsrf);
    let laravelDocsDatabase = vscode.commands.registerCommand('extension.laravelDocsDatabase', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'database'));
    });
    context.subscriptions.push(laravelDocsDatabase);
    let laravelDocsDatabaseTesting = vscode.commands.registerCommand('extension.laravelDocsDatabaseTesting', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'database-testing'));
    });
    context.subscriptions.push(laravelDocsDatabaseTesting);
    let laravelDocsDeployment = vscode.commands.registerCommand('extension.laravelDocsDeployment', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'deployment'));
    });
    context.subscriptions.push(laravelDocsDeployment);
    let laravelDocsDusk = vscode.commands.registerCommand('extension.laravelDocsDusk', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'dusk'));
    });
    context.subscriptions.push(laravelDocsDusk);
    let laravelDocsEloquent = vscode.commands.registerCommand('extension.laravelDocsEloquent', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'eloquent'));
    });
    context.subscriptions.push(laravelDocsEloquent);
    let laravelDocsEloquentCollections = vscode.commands.registerCommand('extension.laravelDocsEloquentCollections', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'eloquent-collections'));
    });
    context.subscriptions.push(laravelDocsEloquentCollections);
    let laravelDocsEloquentMutators = vscode.commands.registerCommand('extension.laravelDocsEloquentMutators', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'eloquent-mutators'));
    });
    context.subscriptions.push(laravelDocsEloquentMutators);
    let laravelDocsEloquentRelationships = vscode.commands.registerCommand('extension.laravelDocsEloquentRelationships', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'eloquent-relationships'));
    });
    context.subscriptions.push(laravelDocsEloquentRelationships);
    let laravelDocsEloquentResources = vscode.commands.registerCommand('extension.laravelDocsEloquentResources', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'eloquent-resources'));
    });
    context.subscriptions.push(laravelDocsEloquentResources);
    let laravelDocsEloquentSerialization = vscode.commands.registerCommand('extension.laravelDocsEloquentSerialization', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'eloquent-serialization'));
    });
    context.subscriptions.push(laravelDocsEloquentSerialization);
    let laravelDocsEncryption = vscode.commands.registerCommand('extension.laravelDocsEncryption', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'encryption'));
    });
    context.subscriptions.push(laravelDocsEncryption);
    let laravelDocsEnvoy = vscode.commands.registerCommand('extension.laravelDocsEnvoy', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'envoy'));
    });
    context.subscriptions.push(laravelDocsEnvoy);
    let laravelDocsErrors = vscode.commands.registerCommand('extension.laravelDocsErrors', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'errors'));
    });
    context.subscriptions.push(laravelDocsErrors);
    let laravelDocsEvents = vscode.commands.registerCommand('extension.laravelDocsEvents', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'events'));
    });
    context.subscriptions.push(laravelDocsEvents);
    let laravelDocsFacades = vscode.commands.registerCommand('extension.laravelDocsFacades', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'facades'));
    });
    context.subscriptions.push(laravelDocsFacades);
    let laravelDocsFilesystem = vscode.commands.registerCommand('extension.laravelDocsFilesystem', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'filesystem'));
    });
    context.subscriptions.push(laravelDocsFilesystem);
    let laravelDocsFrontend = vscode.commands.registerCommand('extension.laravelDocsFrontend', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'frontend'));
    });
    context.subscriptions.push(laravelDocsFrontend);
    let laravelDocsHashing = vscode.commands.registerCommand('extension.laravelDocsHashing', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'hashing'));
    });
    context.subscriptions.push(laravelDocsHashing);
    let laravelDocsHelpers = vscode.commands.registerCommand('extension.laravelDocsHelpers', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'helpers'));
    });
    context.subscriptions.push(laravelDocsHelpers);
    let laravelDocsHomestead = vscode.commands.registerCommand('extension.laravelDocsHomestead', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'homestead'));
    });
    context.subscriptions.push(laravelDocsHomestead);
    let laravelDocsHorizon = vscode.commands.registerCommand('extension.laravelDocsHorizon', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'horizon'));
    });
    context.subscriptions.push(laravelDocsHorizon);
    let laravelDocsHttpTests = vscode.commands.registerCommand('extension.laravelDocsHttpTests', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'http-tests'));
    });
    context.subscriptions.push(laravelDocsHttpTests);
    let laravelDocsInstallation = vscode.commands.registerCommand('extension.laravelDocsInstallation', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'installation'));
    });
    context.subscriptions.push(laravelDocsInstallation);
    let laravelDocsLifecycle = vscode.commands.registerCommand('extension.laravelDocsLifecycle', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'lifecycle'));
    });
    context.subscriptions.push(laravelDocsLifecycle);
    let laravelDocsLocalization = vscode.commands.registerCommand('extension.laravelDocsLocalization', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'localization'));
    });
    context.subscriptions.push(laravelDocsLocalization);
    let laravelDocsLogging = vscode.commands.registerCommand('extension.laravelDocsLogging', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'logging'));
    });
    context.subscriptions.push(laravelDocsLogging);
    let laravelDocsMail = vscode.commands.registerCommand('extension.laravelDocsMail', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'mail'));
    });
    context.subscriptions.push(laravelDocsMail);
    let laravelDocsMiddleware = vscode.commands.registerCommand('extension.laravelDocsMiddleware', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'middleware'));
    });
    context.subscriptions.push(laravelDocsMiddleware);
    let laravelDocsMigrations = vscode.commands.registerCommand('extension.laravelDocsMigrations', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'migrations'));
    });
    context.subscriptions.push(laravelDocsMigrations);
    let laravelDocsMix = vscode.commands.registerCommand('extension.laravelDocsMix', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'mix'));
    });
    context.subscriptions.push(laravelDocsMix);
    let laravelDocsMocking = vscode.commands.registerCommand('extension.laravelDocsMocking', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'mocking'));
    });
    context.subscriptions.push(laravelDocsMocking);
    let laravelDocsNotifications = vscode.commands.registerCommand('extension.laravelDocsNotifications', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'notifications'));
    });
    context.subscriptions.push(laravelDocsNotifications);
    let laravelDocsPackages = vscode.commands.registerCommand('extension.laravelDocsPackages', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'packages'));
    });
    context.subscriptions.push(laravelDocsPackages);
    let laravelDocsPagination = vscode.commands.registerCommand('extension.laravelDocsPagination', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'pagination'));
    });
    context.subscriptions.push(laravelDocsPagination);
    let laravelDocsPassport = vscode.commands.registerCommand('extension.laravelDocsPassport', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'passport'));
    });
    context.subscriptions.push(laravelDocsPassport);
    let laravelDocsPasswords = vscode.commands.registerCommand('extension.laravelDocsPasswords', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'passwords'));
    });
    context.subscriptions.push(laravelDocsPasswords);
    let laravelDocsProviders = vscode.commands.registerCommand('extension.laravelDocsProviders', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'providers'));
    });
    context.subscriptions.push(laravelDocsProviders);
    let laravelDocsQueries = vscode.commands.registerCommand('extension.laravelDocsQueries', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'queries'));
    });
    context.subscriptions.push(laravelDocsQueries);
    let laravelDocsQueues = vscode.commands.registerCommand('extension.laravelDocsQueues', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'queues'));
    });
    context.subscriptions.push(laravelDocsQueues);
    let laravelDocsRedis = vscode.commands.registerCommand('extension.laravelDocsRedis', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'redis'));
    });
    context.subscriptions.push(laravelDocsRedis);
    let laravelDocsReleases = vscode.commands.registerCommand('extension.laravelDocsReleases', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'releases'));
    });
    context.subscriptions.push(laravelDocsReleases);
    let laravelDocsRequests = vscode.commands.registerCommand('extension.laravelDocsRequests', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'requests'));
    });
    context.subscriptions.push(laravelDocsRequests);
    let laravelDocsResponses = vscode.commands.registerCommand('extension.laravelDocsResponses', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'responses'));
    });
    context.subscriptions.push(laravelDocsResponses);
    let laravelDocsRouting = vscode.commands.registerCommand('extension.laravelDocsRouting', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'routing'));
    });
    context.subscriptions.push(laravelDocsRouting);
    let laravelDocsScheduling = vscode.commands.registerCommand('extension.laravelDocsScheduling', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'scheduling'));
    });
    context.subscriptions.push(laravelDocsScheduling);
    let laravelDocsScout = vscode.commands.registerCommand('extension.laravelDocsScout', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'scout'));
    });
    context.subscriptions.push(laravelDocsScout);
    let laravelDocsSeeding = vscode.commands.registerCommand('extension.laravelDocsSeeding', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'seeding'));
    });
    context.subscriptions.push(laravelDocsSeeding);
    let laravelDocsSession = vscode.commands.registerCommand('extension.laravelDocsSession', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'session'));
    });
    context.subscriptions.push(laravelDocsSession);
    let laravelDocsSocialite = vscode.commands.registerCommand('extension.laravelDocsSocialite', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'socialite'));
    });
    context.subscriptions.push(laravelDocsSocialite);
    let laravelDocsStructure = vscode.commands.registerCommand('extension.laravelDocsStructure', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'structure'));
    });
    context.subscriptions.push(laravelDocsStructure);
    let laravelDocsTelescope = vscode.commands.registerCommand('extension.laravelDocsTelescope', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'telescope'));
    });
    context.subscriptions.push(laravelDocsTelescope);
    let laravelDocsTesting = vscode.commands.registerCommand('extension.laravelDocsTesting', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'testing'));
    });
    context.subscriptions.push(laravelDocsTesting);
    let laravelDocsUpgrade = vscode.commands.registerCommand('extension.laravelDocsUpgrade', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'upgrade'));
    });
    context.subscriptions.push(laravelDocsUpgrade);
    let laravelDocsUrls = vscode.commands.registerCommand('extension.laravelDocsUrls', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'urls'));
    });
    context.subscriptions.push(laravelDocsUrls);
    let laravelDocsValet = vscode.commands.registerCommand('extension.laravelDocsValet', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'valet'));
    });
    context.subscriptions.push(laravelDocsValet);
    let laravelDocsValidation = vscode.commands.registerCommand('extension.laravelDocsValidation', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'validation'));
    });
    context.subscriptions.push(laravelDocsValidation);
    let laravelDocsVerification = vscode.commands.registerCommand('extension.laravelDocsVerification', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'verification'));
    });
    context.subscriptions.push(laravelDocsVerification);
    let laravelDocsViews = vscode.commands.registerCommand('extension.laravelDocsViews', () => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baseUrl + 'views'));
    });
    context.subscriptions.push(laravelDocsViews);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map