import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../wallets/turbin3-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { base58 } from "@metaplex-foundation/umi/serializers";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("PfNKWcp7K2nG8FfpFCt22mUrrTNFFxdyr3gUS24sP4B");

// Recipient address
const to = new PublicKey("1C8NWGwdQDnBgLW6YjYEXMbZrYcnCdGTpTX8XChSxfC");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const fromAta = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);
        // Get the token account of the toWallet address, and if it does not exist, create it
        const toAta = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, to);

        // Transfer the new token to the "toTokenAccount" we just created
        const signature = await transfer(connection, keypair, fromAta.address, toAta.address, keypair.publicKey, 1 );
        console.log(`transaction Signature: ${signature}`)
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();