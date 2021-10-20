<template>
    <div class="pg-faq" id="faq">
        <h2 class="h2 pg-faq__header">FAQs</h2>

        <ul class="pg-faq__list">
            <p-g-faq v-for="(faq, index) in FAQs" :key="index" :faq="faq"></p-g-faq>
        </ul>
    </div>
</template>

<script>
import PGFaq from '../PGFaq/PGFaq';

const FAQs = [
    {
        question: 'What is an NFT?',
        answer:
            'An NFT is a “Non-Fungible Token,” meaning that it is <strong>one-of-a-kind</strong> and represents <strong>ownership</strong> of a unique item that can be digital or physical. Like blockchain tokens in general, NFTs are traceable, programmable, and immutable. To learn more, read our article on <a href="https://fantom.foundation/blog/nfts-and-the-fantom-enabled-creator-economy/"><strong>NFTs on Fantom.</strong><a>',
    },
    {
        question: 'What can I do with NFTs?',
        answer:
            'The Pierre Gasly NFTs are digital tokens that owners will use to claim the items they have won in the auction. When items are claimed, the NFT will be “burned,” meaning that auction winners will redeem their NFT for the corresponding physical items. The NFT won’t be in possession of the user anymore and will be sent to an address inaccessible by anyone. ',
    },
    {
        question: 'I’ve read about the negative environmental impact of NFTs. What makes this different?',
        answer:
            'Fantom is built to minimize the system’s overall carbon footprint. Unlike other blockchain protocols that require lots of energy to run, Fantom’s proof-of-stake system means that nodes who validate transactions consume little power to run the blockchain. ',
    },
    {
        question: 'What do I need to do before joining the auction?',
        answer:
            'To participate in the auction, you first need to <strong>install <a href="https://fantom.foundation/blog/the-ultimate-guide-to-the-ftm-token/?__cf_chl_jschl_tk__=pmd_sOpbegfQncikm0fy3uY._Ij9j9sgDcKvojoUF0.R_2Q-1634231103-0-gqNtZGzNAjujcnBszQdR#ftm-metamask">Metamask</a></strong> or the <a href="https://fantom.foundation/blog/coinbase-wallet-integrates-support-for-fantom-mainnet/"><strong>Coinbase Wallet</strong></a> as browser extensions and connect to them through Artion. The <a href="https://docs.fantom.foundation/artion/creating-an-account#how-do-i-connect-to-artion">Artion documentation</a> offers detailed instructions on how to connect your wallet.',
    },
    {
        question: 'What is FTM and where can I get it?',
        answer:
            'FTM is the digital token that is used for transactions on the Fantom blockchain.<br>Numerous <a href="https://fantom.foundation/where-to-buy-ftm/"><strong>exchanges</strong></a> sell FTM. When buying, users should be aware that FTM has <strong>two main token</strong> standards: <strong>Opera</strong> mainnet tokens and Ethereum <strong>ERC20</strong> tokens. You will need mainnet FTM to use the network. To bridge ERC20 to mainnet FTM, <a href="https://fantom.foundation/blog/the-ultimate-guide-to-the-ftm-token#multichain">follow this guide.</a>',
    },
    {
        question: 'I have ERC20 Fantom, but how do I convert it to the native Fantom token? ',
        answer:
            'Fantom makes it easy to <strong>bridge tokens</strong> from Ethereum to Fantom. For step-by-step instructions, consult the <a href="https://fantom.foundation/blog/the-ultimate-guide-to-the-ftm-token/#multichain">relevant section</a> of our <strong>token guide</strong>, which explains how to use the <strong><a href="https://multichain.xyz/">Multichain</a> bridge</strong>.',
    },
    {
        question: 'What digital currencies will I be able to use in this auction?',
        answer:
            'You will be able to bid on items in the Pierre Gasly NFT auction using <strong>wFTM</strong>. Items sold at fixed price may be purchased using <strong>wFTM</strong>, <strong>TOMB</strong>, or <strong>ZOO</strong>.',
    },
    {
        question: 'What is wFTM, and how do I convert my FTM to wFTM?\n',
        answer:
            'wFTM is wrapped FTM, needed in some instances. Artion offers a convenient <strong>wrap station</strong> that makes the process quick and simple. Consult the <a href="https://docs.fantom.foundation/artion/wrapping-unwrapping-ftm"><strong>Artion documentation</strong></a> for step-by-step instructions. ',
    },
    {
        question: 'How does bidding at this auction work? ',
        answer:
            'Auctions refer to sales in which an item is awarded to the <strong>highest bidder</strong>. Note that to place a bid on an item, you must hold a <strong>corresponding amount</strong> of cryptocurrency.<br>For instance, if you have <strong>4 wFTM</strong>, you can place a bid for <strong>3 wFTM</strong>, but if later you wish to raise your bid to <strong>5 wFTM</strong>, you will need to hold at least that amount + a small amount of FTM for <strong>transaction fees</strong>.',
    },
    {
        question: 'What is a transaction fee?',
        answer:
            'A small fee is charged for <strong>any transaction</strong> – be it placing a bid, withdrawing a bid, or making an offer. This fee goes to the validators on the network who verify and confirm transactions. On Fantom, this cost is minimal. We recommend keeping 1 FTM in <strong>reserve</strong>, which will be more than enough to cover several transactions.',
    },
    {
        question: 'What happens once I win an item?',
        answer:
            'Each item in the Pierre Gasly NFT auction has an end time and date when the NFT will be awarded to the highest bidder and transferred to the winner’s wallet. The winner will then be able to redeem the NFT for the item through the auction site. The NFT will be burned (removed from the wallet and destroyed) when the physical item is claimed.',
    },
];
// <a href=""></a>
export default {
    name: 'PGFaqList',

    components: {
        PGFaq,
    },

    data() {
        return {
            FAQs,
        };
    },
};
</script>

<style lang="scss">
@use "style";
</style>
