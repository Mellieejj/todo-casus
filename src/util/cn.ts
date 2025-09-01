import { cx } from 'cva';
import { twMerge } from 'tailwind-merge';

/**
 * This function is a wrapper around cx(clsx) and tailwind-merge.
 * It removes any duplicate, obsolete, tailwind classes. e.g. cn('text-black text-white', {'text-green': true}) => 'text-green'
 * @param args
 */
export function cn(...args: Parameters<typeof cx>) {
	return twMerge(cx(...args));
}
