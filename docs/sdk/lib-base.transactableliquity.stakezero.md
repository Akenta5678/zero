<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@liquity/lib-base](./lib-base.md) &gt; [TransactableLiquity](./lib-base.transactableliquity.md) &gt; [stakeZERO](./lib-base.transactableliquity.stakezero.md)

## TransactableLiquity.stakeZERO() method

Stake ZERO to start earning fee revenue or increase existing stake.

<b>Signature:</b>

```typescript
stakeZERO(amount: Decimalish): Promise<void>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  amount | [Decimalish](./lib-base.decimalish.md) | Amount of ZERO to add to new or existing stake. |

<b>Returns:</b>

Promise&lt;void&gt;

## Exceptions

Throws [TransactionFailedError](./lib-base.transactionfailederror.md) in case of transaction failure.

## Remarks

As a side-effect, the transaction will also pay out an existing ZERO stake's [collateral gain](./lib-base.zerostake.collateralgain.md) and [ZUSD gain](./lib-base.zerostake.zusdgain.md)<!-- -->.
