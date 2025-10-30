import bs58 from 'bs58';
import promptSync from 'prompt-sync';

// Initialize prompt - this syntax should satisfy TypeScript
const prompt = promptSync();

// Convert base58 string to wallet byte array
function base58_to_wallet() {
  console.log("\nEnter your base58 private key (from Phantom):");
  const stdin = prompt('> ');
  const base58String = stdin.trim();
  
  try {
    const wallet = bs58.decode(base58String);
    console.log("\nWallet byte array (copy this into Turbin3-wallet.json):");
    console.log(`[${Array.from(wallet)}]`);
  } catch (error) {
    console.error("Error decoding base58:", error);
  }
}

// Convert wallet byte array to base58 string
function wallet_to_base58() {
  console.log("\nEnter your wallet byte array (comma-separated numbers):");
  const input = prompt('> ');
  
  try {
    // Remove brackets and split by comma
    const cleanInput = input.replace(/[\[\]]/g, '').trim();
    const wallet = new Uint8Array(
      cleanInput.split(',').map(num => parseInt(num.trim()))
    );
    
    const base58 = bs58.encode(wallet);
    console.log("\nBase58 private key:");
    console.log(base58);
  } catch (error) {
    console.error("Error encoding to base58:", error);
  }
}

// CLI menu
console.log("\n=== Wallet Format Converter ===");
console.log("1. Base58 to Wallet (byte array)");
console.log("2. Wallet (byte array) to Base58");
const choice = prompt("Enter your choice (1 or 2): ");

if (choice === '1') {
  base58_to_wallet();
} else if (choice === '2') {
  wallet_to_base58();
} else {
  console.log("Invalid choice");
}