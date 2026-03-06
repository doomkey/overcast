<script lang="ts">
	import { browser } from '$app/environment';
	import { createPDFDocument } from '$lib/functions/pdfGenerator';

	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Switch } from '$lib/components/ui/switch';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';

	let state = $state({
		subtitle: { value: '', visible: true, placeholder: 'An assignment on' },
		title: { value: '', visible: true, placeholder: 'Title of the document' },
		submittedTo: { value: '', visible: true, placeholder: 'Name of the professor' },
		designation: { value: '', visible: true, placeholder: 'Designation' },
		dept: { value: '', visible: true, placeholder: 'Department Name' },
		dept_bottom: { value: '', visible: true, placeholder: 'Department Name' },
		varsity: { value: '', visible: true, placeholder: 'Name of the Institution' },
		varsity_bottom: { value: '', visible: true, placeholder: 'Name of the Institution' },
		submittedBy: { value: '', visible: true, placeholder: 'Student Name' },
		studentId: { value: '', visible: true, placeholder: 'ID Number' },
		regNo: { value: '', visible: true, placeholder: 'Registration No' },
		date: { value: '', visible: true, placeholder: 'Submission Date' }
	});
	let conditions = $state({
		varsity: true,
		dept: true
	});

	$effect(() => {
		if (conditions.varsity) {
			state.varsity_bottom.value = state.varsity.value;
		}
		if (conditions.dept) {
			state.dept_bottom.value = state.dept.value;
		}
	});

	let previewUrl = $state('');

	$effect(() => {
		if (!browser) return;

		const currentState = $state.snapshot(state);
		const updatePreview = () => {
			const doc = createPDFDocument(currentState);
			const blob = doc.output('blob');

			if (previewUrl) URL.revokeObjectURL(previewUrl);
			previewUrl = URL.createObjectURL(blob);
		};

		const timer = setTimeout(updatePreview, 150);
		return () => clearTimeout(timer);
	});

	function download() {
		if (!browser) return;
		const doc = createPDFDocument($state.snapshot(state));
		doc.save(`${state.title.value || 'Cover_Page'}.pdf`);
	}
</script>

<nav class="flex items-center justify-between border-b bg-background px-8 py-4">
	<div class="text-xl font-bold">
		Overcast <span class="text-sm font-normal text-muted-foreground"
			>by <a href="https://doomkey.github.io">doomkey</a></span
		>
	</div>
</nav>

<main class="container mx-auto grid grid-cols-1 gap-8 p-6 lg:grid-cols-2">
	<section class="space-y-6">
		<Card.Root>
			<Card.Header>
				<Card.Title>Assignment Details</Card.Title>
				<Card.Description>Fill in the details to update the cover page preview.</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-6">
				<div class="space-y-4">
					<div class="flex items-center gap-4">
						<Input
							bind:value={state.subtitle.value}
							placeholder={state.subtitle.placeholder}
							disabled={!state.subtitle.visible}
						/>
						<Switch bind:checked={state.subtitle.visible} />
					</div>
					<div class="flex items-center gap-4">
						<Input
							bind:value={state.title.value}
							placeholder={state.title.placeholder}
							disabled={!state.title.visible}
						/>
						<Switch bind:checked={state.title.visible} />
					</div>
				</div>

				<Separator />

				<div class="space-y-4">
					<h4 class="text-sm leading-none font-medium">Submitted to</h4>
					{#each ['submittedTo', 'designation', 'dept', 'varsity'] as key}
						{@const field = state[key as keyof typeof state]}
						<div class="flex items-center gap-4">
							<Input
								bind:value={field.value}
								placeholder={field.placeholder}
								disabled={!field.visible}
							/>
							<Switch bind:checked={field.visible} />
						</div>
					{/each}
				</div>

				<Separator />

				<div class="space-y-4">
					<h4 class="text-sm leading-none font-medium">Submitted by</h4>
					{#each ['submittedBy', 'studentId', 'regNo', 'date'] as key}
						{@const field = state[key as keyof typeof state]}
						<div class="flex items-center gap-4">
							<Input bind:value={field.value} placeholder={field.placeholder} />
							<Switch bind:checked={field.visible} />
						</div>
					{/each}
				</div>
				<div class="space-y-4">
					<h4 class="text-sm leading-none font-medium">Institution Information</h4>
					<div class="space-y-4">
						<Input
							placeholder="Department name"
							disabled={conditions.dept}
							bind:value={state.dept_bottom.value}
						/>
						<div class="flex items-center gap-3">
							<Checkbox id="department-same" bind:checked={conditions.dept} />
							<Label for="department-same">Same as teacher's department</Label>
						</div>
					</div>
					<div class="space-y-4">
						<Input
							placeholder="Name of the Institute"
							bind:value={state.varsity_bottom.value}
							bind:disabled={conditions.varsity}
						/>
						<div class="flex items-center gap-3">
							<Checkbox id="institute-same" bind:checked={conditions.varsity} />
							<Label for="institute-same">Same as teacher's institute</Label>
						</div>
					</div>
				</div>
				<Button class="w-full" onclick={download}>Download PDF</Button>
			</Card.Content>
		</Card.Root>

		<div class="space-y-4">
			<h3 class="text-lg font-bold">FAQ</h3>
			<div class="space-y-2">
				<details class="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
					<summary class="cursor-pointer font-medium">How to use this?</summary>
					<p class="mt-2 text-sm text-muted-foreground">
						Just fill in the input boxes. The preview on the right (or bottom) updates
						automatically.
					</p>
				</details>
				<details class="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
					<summary class="cursor-pointer font-medium">Can I hide fields?</summary>
					<p class="mt-2 text-sm text-muted-foreground">
						Yes, use the toggle switches next to each input to hide specific lines from the PDF.
					</p>
				</details>
			</div>
		</div>
	</section>

	<section class="sticky top-6 h-[calc(100vh-120px)] min-h-[600px]">
		<Card.Root class="h-full overflow-hidden border-2">
			{#if previewUrl}
				<iframe src={previewUrl} title="PDF Preview" class="h-full w-full"></iframe>
			{:else}
				<div class="flex h-full items-center justify-center text-muted-foreground">
					Generating preview...
				</div>
			{/if}
		</Card.Root>
	</section>
</main>
