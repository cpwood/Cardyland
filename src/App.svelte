<script>
	import Single from './Single.svelte';
	import Double from './Double.svelte';
	import Picture from './Picture.svelte';
	import { Deck } from './Deck';
	import {
		Button,
		Modal,
		ModalBody,
		ModalFooter,
		ModalHeader
	} from 'sveltestrap';

	let d = new Deck();
	let visibilityClass = 'card-shown';
	let transitioning = false;
	let sound = new Audio("playcard.wav");

	let startCard = {
		squares: 0,
		className: 'start'
	};

	let card = startCard;
	restart();

	function timeout(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async function getNext() {
		if (!transitioning) {
			transitioning = true;
			sound.play();

			visibilityClass = 'card-hidden';
			await timeout(500);

			card = d.next();
			visibilityClass = 'card-shown';
			await timeout(500);
			
			transitioning = false;
		}
	}

	async function restart() {
		if (!transitioning) {
			transitioning = true;
			sound.play();

			visibilityClass = 'card-hidden';
			await timeout(500);

			d.restart();
			card = startCard;
			visibilityClass = 'card-shown';
			await timeout(500);
			
			transitioning = false;
		}
	}

	let open = false;
	const toggle = () => (open = !open);

	let width = 0;
	let height = 0;
	let header = true;

	$: height = width * 0.5625;
	$: header = window.innerHeight - (width * 0.5625) > 70;
</script>

<style>
	.card-container {
		min-height: 100%;  /* Fallback for browsers do NOT support vh unit */
  		min-height: 100vh; /* These two lines are counted as one :-)       */

		display: flex;
		align-items: center;

		transition: 0.5s;
	}

	.card {
		display: block;
		width: 100%;
		padding-bottom: 56.25%;
		border: 1px solid silver;
		padding: 5%;
		cursor: pointer;
		position: relative;
		max-width: 100%;
	}

	.card-shown {
		opacity: 1;
	}

	.card-hidden {
		opacity: 0;
	}

	.card-inner {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100%;
        padding: 10% 0 10% 0;
	}

	.card-row {
        height: 100%;
    }

	.logo {
		max-height: 20px;
		vertical-align: sub;
	}

	button {
		font-family: 'Lobster Two', cursive;
		font-style: italic;
		margin: 5px;
	}

	button > img {
		height: 25px;
		padding-right: 5px;
	}

	.tag-line {
		font-family: 'Lobster Two', cursive;
		font-size: 1.75em;
		color: #f93d68 !important;
	}

	.footer {
		font-size: 0.5em;
		text-align: center !important;
		margin-top: 60px;
	}

	nav {
		height: 50px !important;
	}

	.btn {
		font-size: 0.8em;
	}
</style>

<main>	
	<header class="{header ? '' : 'd-none'}">
		<nav class="navbar navbar-light fixed-top">
			<div class="container">
			  <a class="navbar-brand" href="/">
				<img src="/images/candycane.svg" class="logo" alt="Cardyland" > Cardyland
			  </a>
			  <div class="d-flex">
				<button class="btn btn-primary" on:click={toggle}>About</button> 
				<button class="btn btn-success" on:click={restart}><img src="/images/reload.png" alt="Start Again"> Start Again</button>
			  </div>
			</div>
		  </nav>
	</header>
	<Modal isOpen={open} {toggle}>
		<ModalHeader {toggle}>About Cardyland</ModalHeader>
		<ModalBody>
		  <p class="tag-line text-center">A sweet little app for sweet little folks!</p>

		  <p>This was created by Chris Wood, Tom Chesterton-Wood and James Chesterton-Wood as a means of playing
		  <strong>Candy Land</strong> without the physical cards. The stack of cards usually ends up toppling over, getting lost...
		  we've all been there!</p>

		  <p>You can use this on a computer, a phone or a tablet!</p>

		  <p>Click or tap on the card to move to the next one in the deck. Once you've been through <em>all</em> the cards,
		  the deck will re-shuffle and the top card will be dealt automatically.</p>

		  <p>To start a new game from scratch, click the <strong>Start Again</strong> button.</p>

		  <div class="footer">Candy Land is a trademark of Hasbro. This fan-created app is unofficial.</div>
		  
		</ModalBody>
		<ModalFooter>
			<div class="text-center">
				<Button color="success" on:click={toggle}>Close</Button>
			</div>
		</ModalFooter>
	  </Modal>
	<div class="container card-container {visibilityClass}">
		<div class="card" bind:clientWidth={width} on:click={getNext} style="height: {height}px">
			<div class="card-inner">
				<div class="row card-row">
					{#if card.squares == 1}
						<Single className={card.className} />
					{:else if card.squares == 2}
						<Double className={card.className} />
					{:else}
						<Picture className={card.className} />
					{/if}
				</div>
			</div>
		</div>
	</div>
</main>