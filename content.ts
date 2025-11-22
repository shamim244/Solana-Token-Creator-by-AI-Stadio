
export const CONTENT = {
  appName: "Solana Forge",
  appNameHighlight: "Forge",
  
  navbar: {
    home: "Home",
    create: "Create Token",
    faq: "FAQ",
    contact: "Contact",
    connect: "Connect Wallet",
    connecting: "Connecting...",
    disconnect: "Disconnect"
  },

  footer: {
    tagline: "The easiest way to create SPL tokens.",
    copyright: "© 2024 Solana Forge. Built for the Solana Community.",
    links: {
      home: "Home",
      create: "Create",
      faq: "FAQ",
      contact: "Contact"
    }
  },

  home: {
    hero: {
      badge: "Live on Solana Devnet & Mainnet",
      titlePrefix: "Launch Your Token",
      titleHighlight: "In Seconds",
      subtitle: "The most advanced no-code token creator for Solana. Deploy secure, compliant SPL tokens with metadata, authority management, and storage integration.",
      primaryCta: "Start Creating",
      secondaryCta: "Learn More"
    },
    features: {
      title: "Professional Grade Features",
      subtitle: "Everything you need to launch a successful token project.",
      items: [
        { 
          id: "wizard",
          title: "No-Code Wizard", 
          desc: "Simple 3-step process to define your token, upload logos, and set parameters without writing a single line of Rust." 
        },
        { 
          id: "storage",
          title: "Decentralized Storage", 
          desc: "Automatic integration with Irys/Arweave for permanent, censorship-resistant metadata and image storage." 
        },
        { 
          id: "auth",
          title: "Authority Management", 
          desc: "Toggle mint, freeze, and update authorities securely. Create immutable tokens to build community trust." 
        },
        { 
          id: "deploy",
          title: "Instant Deployment", 
          desc: "Direct interaction with the Solana blockchain. Sign one transaction and your token is live instantly." 
        },
        { 
          id: "metadata",
          title: "Advanced Metadata", 
          desc: "Add social links (Twitter, Discord), tags, and custom creator addresses directly to your token's on-chain data." 
        },
        { 
          id: "devnet",
          title: "Devnet Sandbox", 
          desc: "Test everything safely on Devnet for free before deploying real assets on Mainnet Beta." 
        }
      ]
    },
    stats: [
      { value: "10k+", label: "Tokens Created" },
      { value: "$0", label: "Platform Fees" },
      { value: "100%", label: "Decentralized" },
      { value: "24/7", label: "Uptime" }
    ],
    cta: {
      title: "Ready to launch?",
      subtitle: "Connect your wallet and create your SPL token on Solana's high-speed blockchain today.",
      button: "Launch Console"
    }
  },

  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about creating tokens on Solana Forge.",
    items: [
      {
        question: "How much does it cost to create a token?",
        answer: "The cost involves Solana network fees (rent + transaction fees) and Arweave storage fees for the metadata. Typically, this is less than 0.02 SOL (~$2-$4 depending on SOL price). Solana Forge does not charge any additional platform fees."
      },
      {
        question: "What is the difference between Devnet and Mainnet?",
        answer: "Devnet is a testing network where tokens have no financial value. It's used to test your token settings safely. Mainnet Beta is the live Solana blockchain where tokens have real value and transactions cost real SOL."
      },
      {
        question: "What does 'Revoke Mint Authority' mean?",
        answer: "Revoking mint authority means you permanently disable the ability to mint (create) more tokens. This effectively makes your token 'Fixed Supply'. This action is irreversible and is often required for investor trust."
      },
      {
        question: "Can I update my token logo or name later?",
        answer: "Yes, as long as you do not 'Revoke Update Authority' (Make Immutable). If you keep the update authority, you can use tools like Metaplex to update metadata. If you make it immutable, the details are locked forever."
      },
      {
        question: "Is my private key safe?",
        answer: "Yes. Solana Forge does not access your private keys. We use standard Wallet Adapters (like Phantom or Solflare) where you sign the transaction within your wallet extension. The application only builds the transaction for you to approve."
      },
      {
        question: "Where is the token image stored?",
        answer: "We utilize decentralized storage solutions like Irys (Arweave) to store your token images and metadata JSON. This ensures your token's data is permanent and censorship-resistant."
      }
    ]
  },

  contact: {
    title: "Get in Touch",
    subtitle: "Have questions about token creation? Need enterprise support? Reach out to our team directly.",
    cards: {
      email: { title: "Email Support", detail: "support@solanaforge.com", sub: "Response within 24h" },
      twitter: { title: "Twitter / X", detail: "@SolanaForge", sub: "Follow for updates" },
      discord: { title: "Discord Community", detail: "discord.gg/solanaforge", sub: "Join 5,000+ creators" }
    },
    form: {
      title: "Send a Message",
      fields: {
        name: "Name",
        namePlaceholder: "Your Name",
        email: "Email",
        emailPlaceholder: "you@example.com",
        message: "Message",
        messagePlaceholder: "How can we help?"
      },
      submit: "Send Message",
      success: {
        title: "Message Sent!",
        desc: "We'll get back to you as soon as possible.",
        reset: "Send another message"
      }
    }
  },

  createToken: {
    pageTitle: "Create SPL Token",
    pageSubtitle: "Deploy a new Solana token in just a few steps.",
    steps: ["Basics", "Advanced", "Review"],
    buttons: {
      back: "Back",
      next: "Next",
      create: "Create Token",
      connect: "Connect Wallet First",
      processing: "Processing...",
      reset: "Create Another Token",
      insufficientFunds: "Insufficient Funds"
    },
    
    form: {
      // Basic Step
      image: {
        label: "Token Logo",
        placeholder: "Click to upload",
        subtext: "PNG, JPG, GIF (Max 5MB)"
      },
      name: { label: "Token Name", placeholder: "e.g. Solana Summer" },
      symbol: { label: "Symbol", placeholder: "e.g. SOL" },
      decimals: { label: "Decimals", placeholder: "9" },
      supply: { label: "Initial Supply", placeholder: "1000000" },
      description: { label: "Description", placeholder: "Describe your project, utility, or story..." },
      infoBox: "Info: Most Solana tokens use 9 decimals (like SOL). The supply entered here will be minted to your wallet immediately upon creation.",

      // Advanced Step
      socials: {
        title: "Social Media & Links",
        subtitle: "(Optional)",
        website: "Website",
        twitter: "Twitter / X",
        telegram: "Telegram",
        discord: "Discord"
      },
      tags: {
        title: "Tags",
        subtitle: "(Optional)",
        label: "Tags (comma separated)",
        placeholder: "e.g. DeFi, Meme, Utility, Gaming"
      },
      creator: {
        title: "Custom Creator Address",
        subtitle: "(Optional)",
        label: "Creator Wallet Address",
        placeholder: "Leave empty to use connected wallet",
        help: "The creator address is stored in the metadata. If unspecified, your connected wallet will be marked as the creator."
      },
      authorities: {
        title: "Authority Revocation",
        subtitle: "Revoke authorities to make your token more trustworthy.",
        irreversibleTitle: "Important Warning",
        irreversibleText: "Revoking authorities is irreversible. Once revoked, you cannot regain control.",
        revokeMint: {
          label: "Revoke Mint Authority",
          desc: "Prevent minting additional tokens. This creates a Fixed Supply token."
        },
        revokeFreeze: {
          label: "Revoke Freeze Authority",
          desc: "Prevent freezing token accounts. Investors prefer this for decentralized tokens."
        },
        revokeUpdate: {
          label: "Revoke Update Authority (Make Immutable)",
          desc: "Prevent updating token metadata (name, image, etc) forever."
        }
      }
    },

    review: {
      title: "Review & Confirm",
      noImg: "No Img",
      supplyLabel: "Initial Supply",
      creatorLabel: "Creator Address",
      connectedWallet: "Connected Wallet",
      metadataSection: "Metadata",
      securitySection: "Security Config",
      mintAuth: "Mint Authority",
      freezeAuth: "Freeze Authority",
      updateAuth: "Update Authority",
      status: {
        revoked: "REVOKED",
        active: "ACTIVE",
        fixed: "Fixed Supply",
        variable: "Variable Supply",
        immutable: "Immutable",
        mutable: "Mutable"
      },
      summary: {
        title: "Order Summary",
        item: "Item",
        price: "Price",
        total: "Total Estimate",
        discountBadge: "OFF"
      }
    },

    success: {
      title: "Token Created!",
      subtitle: "Your token has been deployed to",
      mintLabel: "Mint Address",
      sigLabel: "Transaction Signature",
      explorer: "View on Solana Explorer"
    }
  }
};