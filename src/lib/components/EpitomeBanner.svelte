<script>
	import Button from './ui/button/button.svelte';
	import * as Card from './ui/card/index';
</script>

<Card.Root class="bg-accent text-accent-foreground">
	<Card.Header>
		<Card.Title>Liked Overcast?</Card.Title>
		<Card.Description class="text-accent-foreground/70">You'll love Epitome</Card.Description>
	</Card.Header>
	<Card.Content class="-mt-4 space-y-2">
		<p>A free, feature-rich resume generator by Doomkey.</p>
		<Button href="https://doomkey.github.io/epitome" variant="secondary" target="_blank"
			>Generate Resume</Button
		>
	</Card.Content>
</Card.Root>
