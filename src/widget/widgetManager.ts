import {connectToChild} from 'penpal';

import { IConfig, IMethods, IWidget } from '../types';

import { onWindowLoad,validateSecureOrigin } from '../utils';
import { styles } from './styles';

// Create a .env file to override the default WIDGET_URL when running locally
const EMIT_WIDGET_URL = process.env.EMIT_WIDGET_URL || 'https://accounts.emit.technology';
const EMIT_CONTAINER_CLASS = 'emit-widget-container';
const EMIT_IFRAME_CLASS = 'emit-widget-frame';

export function windowLoadHandler() {
    if (document.getElementsByClassName(EMIT_CONTAINER_CLASS).length) {
        console.warn(
            'EMIT script was already loaded. This might cause unexpected behavior. If loading with a script tag, please make sure that you only load it once.',
        );
    }
}

export class WidgetManager {
    private widgetPromise?: Promise<IWidget>;
    private widgetInstance?: IWidget;
    private _widgetUrl = EMIT_WIDGET_URL;
    private _onActiveWalletChangedCallback?: (walletAddress: string) => void;
    private _onErrorCallback: (error: Error) => void = () => {};

    constructor(private _widgetConfig: IConfig) {
        validateSecureOrigin();
        WidgetManager._checkIfWidgetAlreadyInitialized();
    }

    // async singleton
    async getWidget() {
        if (!this.widgetInstance) {
            if (!this.widgetPromise) {
                this.widgetPromise = this._initWidget();
            }
            this.widgetInstance = await this.widgetPromise;
        }
        return this.widgetInstance;
    }
    // Population by the dev of SDK callbacks that might be invoked by the widget

    setOnActiveWalletChangedCallback(callback: (walletAddress: string) => void) {
        this._onActiveWalletChangedCallback = callback;
    }

    setOnErrorCallback(callback: (error: Error) => void) {
        this._onErrorCallback = callback;
    }

    // SDK methods that could be invoked by the user and handled by the widget

    async showWidget() {
        const widgetCommunication = (await this.getWidget()).communication;
        return widgetCommunication.showWidget(this._widgetConfig);
    }

    // internal methods

    private static _checkIfWidgetAlreadyInitialized() {
        if (document.getElementsByClassName(EMIT_CONTAINER_CLASS).length) {
            console.warn(
                'An instance of EMIT was already initialized. This is probably a mistake. Make sure that you use the same EMIT instance throughout your app.',
            );
        }
    }

    private async _initWidget(): Promise<IWidget> {
        await onWindowLoad();

        const style = document.createElement('style');
        style.innerHTML = styles;

        const container = document.createElement('div');
        container.className = EMIT_CONTAINER_CLASS;

        const widgetFrame = document.createElement('div');
        widgetFrame.id = `emit-container-${Date.now()}`;
        widgetFrame.className = EMIT_IFRAME_CLASS;

        const iframe = document.createElement('iframe');
        console.log("init...",this._widgetUrl,this);
        iframe.src = this._widgetUrl;
        iframe.style.position = 'absolute';
        iframe.style.height = '100%';
        iframe.style.width = '100%';
        iframe.style.border = '0 transparent';

        // This conditional is not Penpal-specific. It's merely
        // an example of how you can add an iframe to the document.
        if (
            document.readyState === 'complete' ||
            document.readyState === 'interactive'
        ) {
            widgetFrame.appendChild(iframe);
            container.appendChild(widgetFrame);
            document.body.appendChild(container);
            document.head.appendChild(style);
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                widgetFrame.appendChild(iframe);
                container.appendChild(widgetFrame);
                document.body.appendChild(container);
                document.head.appendChild(style);
            });
        }

        const connection = connectToChild<IMethods>({
            iframe:iframe,
            methods: {
                setHeight: this._setHeight.bind(this),
                getWindowSize: WidgetManager._getWindowSize.bind(this),
                onActiveWalletChanged: this._onActiveWalletChanged.bind(this),
                hasOnActiveWalletChanged: this.hasOnActiveWalletChanged.bind(this),
                onError: this._onError.bind(this),
            },
        });

        const communication = await connection.promise;
        await communication.setConfig(this._widgetConfig);

        return { communication, widgetFrame };
    }

    private async _setHeight(height: number) {
        const widgetFrame = (await this.getWidget()).widgetFrame;
        widgetFrame.style.height = `${height}px`;
    }

    private static _getWindowSize() {
        const body = document.getElementsByTagName('body')[0];
        const width = window.innerWidth || document.documentElement.clientWidth || body.clientWidth;
        const height = window.innerHeight || document.documentElement.clientHeight || body.clientHeight;
        return { width, height };
    }

    private _onActiveWalletChanged(walletAddress: string) {
        if (this._onActiveWalletChangedCallback) {
            this._onActiveWalletChangedCallback(walletAddress);
        }
    }

    private hasOnActiveWalletChanged(): boolean {
        return !!this._onActiveWalletChangedCallback;
    }

    private _onError(error: Error) {
        if (this._onErrorCallback) {
            this._onErrorCallback(error);
        }
    }
}
