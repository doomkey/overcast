<script lang="ts">
	import * as Popover from '$lib/components/ui/popover';
	import * as Command from '$lib/components/ui/command';
	import { cn } from '$lib/utils';
	import XIcon from '@lucide/svelte/icons/x';
	import { Input } from '$lib/components/ui/input';

	let {
		value = $bindable(''),
		history = $bindable([]),
		placeholder = '',
		class: className,
		...restProps
	}: {
		value: string;
		history: string[];
		placeholder?: string;
		class?: string;
		[key: string]: unknown;
	} = $props();

	let open = $state(false);

	const filtered = $derived(
		value.trim() ? history.filter((h) => h.toLowerCase().includes(value.toLowerCase())) : history
	);

	function handleInput(e: Event) {
		value = (e.target as HTMLInputElement).value;
		open = filtered.length > 0;
	}

	function handleSelect(item: string) {
		value = item;
		open = false;
	}

	function handleRemove(e: MouseEvent, item: string) {
		e.preventDefault();
		e.stopPropagation();
		history = history.filter((h) => h !== item);
		if (history.length === 0) open = false;
	}
</script>

<Popover.Root bind:open>
	<Popover.Trigger asChild>
		{#snippet child({ props })}
			<div {...props} class={cn('flex w-full items-center ', className)}>
				<Input
					{...restProps}
					type="text"
					class="w-full bg-transparent outline-none placeholder:text-muted-foreground"
					{placeholder}
					{value}
					oninput={handleInput}
					onfocus={() => {
						if (filtered.length > 0) open = true;
					}}
					onkeydown={(e) => {
						if (e.key === ' ') e.stopPropagation();
						if (e.key === 'Enter') {
							const trimmed = value.trim();
							if (trimmed && !history.includes(trimmed)) {
								history = [trimmed, ...history];
							}
						}
					}}
				/>
			</div>
		{/snippet}
	</Popover.Trigger>

	{#if filtered.length > 0}
		<Popover.Content
			class=" w-dvw overflow-y-auto p-0"
			align="center"
			onOpenAutoFocus={(e) => e.preventDefault()}
		>
			<Command.Root>
				<Command.List>
					<Command.Group>
						{#each filtered as item (item)}
							<Command.Item
								value={item}
								onSelect={() => handleSelect(item)}
								class="flex items-center justify-between gap-2"
							>
								<button
									type="button"
									onclick={(e) => handleRemove(e, item)}
									class="shrink-0 rounded-full p-0.5 hover:bg-accent"
									aria-label="Remove {item}"
								>
									<XIcon class="h-3.5 w-3.5 text-muted-foreground" />
								</button>
								<span class="wrap-break-words whitespace-normal">{item}</span>
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.List>
			</Command.Root>
		</Popover.Content>
	{/if}
</Popover.Root>
