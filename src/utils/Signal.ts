/* eslint-disable @typescript-eslint/no-explicit-any */

export class Signal<T = void> {
	private handlers: Map<any, Set<(data: T) => void>> = new Map();
	private oneTimeHandlers: Map<any, Set<(data: T) => void>> = new Map();

	public add(handler: (data: T) => void, context?: any): void {
		this.addHandler(this.handlers, handler, context || this);
	}

	public addOnce(handler: (data: T) => void, context?: any): void {
		this.addHandler(this.oneTimeHandlers, handler, context || this);
	}

	public emit(data: T): void {
		this.handlers.forEach((arr, key) => {
			arr.forEach((handler) => {
				handler.call(key, data);
			});
		});
		this.oneTimeHandlers.forEach((arr, key) => {
			arr.forEach((handler) => {
				handler.call(key, data);
			});
		});
		this.oneTimeHandlers.clear();
	}

	public remove(handler: (data: T) => void, context?: any): void {
		this.removeHandler(this.handlers, handler, context || this);
		this.removeHandler(this.oneTimeHandlers, handler, context || this);
	}

	public removeAll(): void {
		this.handlers.clear();
		this.oneTimeHandlers.clear();
	}

	private addHandler(target: Map<any, Set<(data: T) => void>>, handler: (data: T) => void, context: any = this): void {
		if (!target.has(context)) {
			target.set(context, new Set());
		}
		target.get(context)!.add(handler);
	}

	private removeHandler(target: Map<any, Set<(data: T) => void>>, handler: (data: T) => void, context: any = this): void {
		if (target.has(context)) {
			target.get(context)!.delete(handler);

			if (target.get(context)!.size === 0) {
				target.get(context)!.clear();
			}
		}
	}
}
