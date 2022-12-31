<script>
	import { page } from '$app/stores'

	const hashtag = "uhyo"

	import { Textarea, Card, Label, Input, Button, Blockquote  } from 'flowbite-svelte'
	let textareaprops = {
		id: 'resolution',
		name: 'resolution',
		label: '抱負を書いてみましょう',
		rows: 4,
		placeholder: '抱負を書いてみましょう',
		required: true
	};
	export let form;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1 class="wf-roundedmplus1c">
		2023年の抱負を共有してみよう
	</h1>

	<div class="max-w-4xl w-full m-2">
		<form method="POST">
			<div class='max-w-4xl m-2'>
				<Label for='poster' class='block mb-2'>名前（匿名可）</Label>
				<Input id='poster' name="poster" placeholder="匿名" />
			</div>
			<div class='max-w-4xl m-2'>
				<Textarea {...textareaprops} />
			</div>
			{#if form?.error}
				<p class="error">{form.error}</p>
			{/if}
			<Button type="submit" class="m-2">送信</Button>
		</form>
	</div>
	<section class="max-w-4xl w-full m-2 p-2">
		<div class="text-left">
			<p class="w-full font-bold text-left m-2">みんなの抱負</p>
		</div>
		<Card padding="lg" size="xl" class="grid md:grid-cols-2">
			{#each $page.data.resolutions as post}
			<figure class="flex flex-col justify-center items-center p-8 text-center bg-white rounded-tr-lg border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
				<Blockquote  border bg class="p-4 my-4">
					"{post.resolution}"
				</Blockquote>
				<figcaption class="flex justify-center items-center space-x-3">
					<div class="space-y-0.5 font-medium dark:text-white text-left">
						<div>{post.poster}</div>
					</div>
				</figcaption>
			</figure>
			{/each}
		</Card>
	</section>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
