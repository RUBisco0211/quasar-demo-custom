import { ref } from 'vue';

type TypewriterOptions = {
    initial?: string;
    typeSpeed?: number;
    deleteSpeed?: number;
    onTaskStart?: (task: Readonly<TypewriterTask>, index: number) => void;
};

type TypewriterTask = TypeTask | BackspaceTask | PauseTask;

type TypeTask = {
    type: 'type';
    text: string;
};

type BackspaceTask = {
    type: 'backspace';
    length: number;
};

type PauseTask = {
    type: 'pause';
    duration: number;
};

type Typewriter = {
    setDefaults(options: Omit<TypewriterOptions, 'onTaskStart'>): Typewriter;
    type(text: string, speed?: number): Typewriter;
    backspace(length: number, speed?: number): Typewriter;
    pause(duration?: number): Typewriter;
    reset(): Typewriter;
    go(): void;
};

function useTypewriter(options: TypewriterOptions = {}) {
    const {
        onTaskStart,
        initial,
        typeSpeed: ts = 200,
        deleteSpeed: ds = 100,
    } = options;

    const text = ref<string>(initial ?? '');
    const taskQueue = ref<TypewriterTask[]>([]);

    const typeSpeed = ref<number>(ts);
    const deleteSpeed = ref<number>(ds);
    let _index = 0;

    const typewriter: Typewriter = {
        setDefaults(options: Omit<TypewriterOptions, 'onTaskStart'>) {
            text.value = options.initial ?? '';
            typeSpeed.value = options.typeSpeed ?? 200;
            deleteSpeed.value = options.deleteSpeed ?? 100;
            return this;
        },
        type(text: string) {
            taskQueue.value.push({ type: 'type', text });
            return this;
        },
        backspace(this: Typewriter, length: number) {
            taskQueue.value.push({ type: 'backspace', length });
            return this;
        },
        pause(this: Typewriter, duration = 0) {
            taskQueue.value.push({ type: 'pause', duration });
            return this;
        },
        reset() {
            _index = 0;
            return this;
        },
        go() {
            _executeNext();
        },
    };

    const _executeNext = () => {
        if (_index >= taskQueue.value.length) return;
        const task = taskQueue.value[_index];
        onTaskStart?.({ ...task } as const, _index);
        const callback = () => {
            _index++;
            _executeNext();
        };
        switch (task.type) {
            case 'type':
                _typeText(task.text, typeSpeed.value ?? 200, callback);
                break;
            case 'backspace':
                _deleteText(task.length, deleteSpeed.value ?? 200, callback);
                break;
            case 'pause':
                setTimeout(callback, task.duration);
                break;
        }
    };
    const _typeText = (t: string, sp: number, cb: () => void) => {
        let i = 0;
        const typeNextChar = () => {
            if (i < t.length) {
                text.value += t.charAt(i);
                i++;
                setTimeout(typeNextChar, sp);
            } else cb();
        };
        typeNextChar();
    };
    const _deleteText = (l: number, sp: number, cb: () => void) => {
        let len = l;
        let i = text.value.length;
        const deleteNextChar = () => {
            if (i > 0 && len > 0) {
                text.value = text.value.substring(0, i - 1);
                len--;
                i--;
                setTimeout(deleteNextChar, sp);
            } else cb();
        };
        deleteNextChar();
    };

    return {
        text,
        typewriter,
        taskQueue,
    };
}

export {
    useTypewriter,
    type Typewriter,
    type TypewriterOptions,
    type TypewriterTask,
    type TypeTask,
    type BackspaceTask,
    type PauseTask,
};
