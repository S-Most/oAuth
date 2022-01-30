<script context = "module">
    export async function load({ session }) {
        return {
            props: {
                user: session.user,
            }
        }
    }
</script>

<script>
    import LogInButton from "../components/LogInButton.svelte"
    import LogOutButton from "../components/LogOutButton.svelte"

    export let user;
</script>

<h1>Test OAuth Svelte with Github</h1>

{#if user}
    <p>Welcome {user}</p>
    <LogOutButton/>
{:else}
    <LogInButton/>
{/if}