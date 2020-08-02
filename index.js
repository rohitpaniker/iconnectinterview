const readline = require("readline");

const {
  TRANSPORT_COST,
  MASK_UK_COST,
  MASK_GERMANY_COST,
  GLOVES_UK_COST,
  GLOVES_GERMANY_COST,
} = require("./constants");

let MASK_UK_INVENTORY = 100;
let MASK_GERMANY_INVENTORY = 100;
let GLOVES_UK_INVENTORY = 100;
let GLOVES_GERMANY_INVENTORY = 50;
let OUT_OF_STOCK = false;
let OUT_OF_STOCK_WP = false;

let MASK_ORDER_QTY, GLOVES_ORDER_QTY, DIFFERENCE_QTY, DISCOUNT_AMT;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.output,
});

const askUser = () => {
  rl.question("", async (command) => {
    console.log(`\n\nEnter a command or Type 'exit' to quit:`);
    if (command !== "exit") {
      await doComputations(command);
      askUser();
    } else {
      rl.close();
    }
  });
};

rl.on("close", () => {
  console.log("BYE!!");
  process.exit(0);
});

doComputations = (input) => {
  const userInput = input.split(":");
  if (userInput.length === 5) {
    switch (userInput[0]) {
      case "UK":
        // ordering from GERMANY
        GLOVES_ORDER_QTY = userInput[2];
        MASK_ORDER_QTY = userInput[4];

        if (
          MASK_UK_INVENTORY + MASK_GERMANY_INVENTORY - MASK_ORDER_QTY < 0 ||
          GLOVES_UK_INVENTORY + GLOVES_GERMANY_INVENTORY - GLOVES_ORDER_QTY < 0
        ) {
          OUT_OF_STOCK = true;
        } else {
          if (MASK_GERMANY_INVENTORY - MASK_ORDER_QTY > 0) {
            MASK_GERMANY_INVENTORY = MASK_GERMANY_INVENTORY - MASK_ORDER_QTY;

            MASK_FINAL_AMT = MASK_ORDER_QTY * MASK_UK_COST;
          } else {
            DIFFERENCE_QTY = MASK_ORDER_QTY - MASK_UK_INVENTORY;

            MASK_UK_INVENTORY =
              MASK_UK_INVENTORY - (MASK_ORDER_QTY - DIFFERENCE_QTY);

            TOTAL_TRANSPORT_COST = TRANSPORT_COST * (DIFFERENCE_QTY / 10);
            MASK_FINAL_AMT =
              (MASK_ORDER_QTY - DIFFERENCE_QTY) * MASK_UK_COST +
              DIFFERENCE_QTY * MASK_GERMANY_COST;
          }

          if (GLOVES_UK_INVENTORY - GLOVES_ORDER_QTY > 0) {
            GLOVES_UK_INVENTORY = GLOVES_UK_INVENTORY - GLOVES_ORDER_QTY;

            GLOVES_FINAL_AMT = GLOVES_ORDER_QTY * GLOVES_UK_COST;
          } else {
            DIFFERENCE_QTY = GLOVES_ORDER_QTY - GLOVES_UK_INVENTORY;

            GLOVES_UK_INVENTORY =
              GLOVES_UK_INVENTORY - (GLOVES_ORDER_QTY - DIFFERENCE_QTY);

            TOTAL_TRANSPORT_COST = TRANSPORT_COST * (DIFFERENCE_QTY / 10);
            GLOVES_FINAL_AMT =
              (GLOVES_ORDER_QTY - DIFFERENCE_QTY) * GLOVES_UK_COST +
              DIFFERENCE_QTY * GLOVES_GERMANY_COST +
              TOTAL_TRANSPORT_COST;
          }
        }

        console.log(
          `${
            OUT_OF_STOCK
              ? ">>>>> OUT_OF_STOCK"
              : MASK_FINAL_AMT + GLOVES_FINAL_AMT
          }:${MASK_UK_INVENTORY}:${MASK_GERMANY_INVENTORY}:${GLOVES_UK_INVENTORY}:${GLOVES_GERMANY_INVENTORY}`
        );
        break;
      case "Germany":
        // ordering from UK
        GLOVES_ORDER_QTY = userInput[2];
        MASK_ORDER_QTY = userInput[4];

        if (
          MASK_GERMANY_INVENTORY + MASK_UK_INVENTORY - MASK_ORDER_QTY < 0 ||
          GLOVES_GERMANY_INVENTORY + GLOVES_UK_INVENTORY - GLOVES_ORDER_QTY < 0
        ) {
          OUT_OF_STOCK = true;
        } else {
          if (MASK_UK_INVENTORY - MASK_ORDER_QTY > 0) {
            MASK_UK_INVENTORY = MASK_UK_INVENTORY - MASK_ORDER_QTY;

            MASK_FINAL_AMT = MASK_ORDER_QTY * MASK_UK_COST;
          } else {
            DIFFERENCE_QTY = MASK_ORDER_QTY - MASK_UK_INVENTORY;

            MASK_UK_INVENTORY =
              MASK_UK_INVENTORY - (MASK_ORDER_QTY - DIFFERENCE_QTY);

            TOTAL_TRANSPORT_COST = TRANSPORT_COST * (DIFFERENCE_QTY / 10);
            MASK_FINAL_AMT =
              (MASK_ORDER_QTY - DIFFERENCE_QTY) * MASK_UK_COST +
              DIFFERENCE_QTY * MASK_GERMANY_COST +
              +TOTAL_TRANSPORT_COST;
          }

          if (GLOVES_UK_INVENTORY - GLOVES_ORDER_QTY > 0) {
            GLOVES_UK_INVENTORY = GLOVES_UK_INVENTORY - GLOVES_ORDER_QTY;

            GLOVES_FINAL_AMT = GLOVES_ORDER_QTY * GLOVES_UK_COST;
          } else {
            DIFFERENCE_QTY = GLOVES_ORDER_QTY - GLOVES_UK_INVENTORY;

            GLOVES_UK_INVENTORY =
              GLOVES_UK_INVENTORY - (GLOVES_ORDER_QTY - DIFFERENCE_QTY);

            TOTAL_TRANSPORT_COST = TRANSPORT_COST * (DIFFERENCE_QTY / 10);
            GLOVES_FINAL_AMT =
              (GLOVES_ORDER_QTY - DIFFERENCE_QTY) * GLOVES_UK_COST +
              DIFFERENCE_QTY * GLOVES_GERMANY_COST +
              TOTAL_TRANSPORT_COST;
          }
        }

        console.log(
          `${
            OUT_OF_STOCK
              ? ">>>>> OUT_OF_STOCK"
              : MASK_FINAL_AMT + GLOVES_FINAL_AMT
          }:${MASK_UK_INVENTORY}:${MASK_GERMANY_INVENTORY}:${GLOVES_UK_INVENTORY}:${GLOVES_GERMANY_INVENTORY}`
        );
        break;
      default:
        break;
    }
  } else if (userInput.length === 6) {
    switch (userInput[0]) {
      case "Germany":
        // ordering from GERMANY
        GLOVES_ORDER_QTY = userInput[3];
        MASK_ORDER_QTY = userInput[5];

        if (
          MASK_GERMANY_INVENTORY + MASK_UK_INVENTORY - MASK_ORDER_QTY < 0 ||
          GLOVES_GERMANY_INVENTORY + GLOVES_UK_INVENTORY - GLOVES_ORDER_QTY < 0
        ) {
          OUT_OF_STOCK_WP = true;
        } else {
          if (MASK_GERMANY_INVENTORY - MASK_ORDER_QTY > 0) {
            MASK_GERMANY_INVENTORY = MASK_GERMANY_INVENTORY - MASK_ORDER_QTY;

            MASK_FINAL_AMT = MASK_ORDER_QTY * MASK_GERMANY_COST;
          } else {
            DIFFERENCE_QTY = MASK_ORDER_QTY - MASK_GERMANY_INVENTORY;

            MASK_GERMANY_INVENTORY =
              MASK_GERMANY_INVENTORY - (MASK_ORDER_QTY - DIFFERENCE_QTY);
            if (userInput[1][0] === "B") {
              TOTAL_TRANSPORT_COST = TRANSPORT_COST * (DIFFERENCE_QTY / 10);
              DISCOUNT_AMT = TOTAL_TRANSPORT_COST - TOTAL_TRANSPORT_COST * 0.2;
              MASK_FINAL_AMT =
                (MASK_ORDER_QTY - DIFFERENCE_QTY) * MASK_GERMANY_COST +
                DIFFERENCE_QTY * MASK_UK_COST +
                DISCOUNT_AMT;
            } else {
              MASK_FINAL_AMT =
                (MASK_ORDER_QTY - DIFFERENCE_QTY) * MASK_GERMANY_COST +
                DIFFERENCE_QTY * MASK_UK_COST;
            }
          }

          if (GLOVES_GERMANY_INVENTORY - GLOVES_ORDER_QTY > 0) {
            GLOVES_GERMANY_INVENTORY =
              GLOVES_GERMANY_INVENTORY - GLOVES_ORDER_QTY;

            GLOVES_FINAL_AMT = GLOVES_ORDER_QTY * GLOVES_GERMANY_COST;
          } else {
            DIFFERENCE_QTY = GLOVES_ORDER_QTY - GLOVES_GERMANY_INVENTORY;

            GLOVES_GERMANY_INVENTORY =
              GLOVES_GERMANY_INVENTORY - (GLOVES_ORDER_QTY - DIFFERENCE_QTY);

            if (userInput[1][0] === "B") {
              TOTAL_TRANSPORT_COST = TRANSPORT_COST * (DIFFERENCE_QTY / 10);
              DISCOUNT_AMT = TOTAL_TRANSPORT_COST - TOTAL_TRANSPORT_COST * 0.2;
              GLOVES_FINAL_AMT =
                (GLOVES_ORDER_QTY - DIFFERENCE_QTY) * GLOVES_GERMANY_COST +
                DIFFERENCE_QTY * GLOVES_UK_COST +
                DISCOUNT_AMT;
            } else {
              GLOVES_FINAL_AMT =
                (GLOVES_ORDER_QTY - DIFFERENCE_QTY) * GLOVES_GERMANY_COST +
                DIFFERENCE_QTY * GLOVES_UK_COST;
            }
          }
        }
        console.log(
          `${
            OUT_OF_STOCK_WP
              ? ">>>>> OUT_OF_STOCK"
              : MASK_FINAL_AMT + GLOVES_FINAL_AMT
          }:${MASK_UK_INVENTORY}:${MASK_GERMANY_INVENTORY}:${GLOVES_UK_INVENTORY}:${GLOVES_GERMANY_INVENTORY}`
        );
        break;
      case "UK":
        // ordering from UK
        GLOVES_ORDER_QTY = userInput[3];
        MASK_ORDER_QTY = userInput[5];

        if (
          MASK_UK_INVENTORY + MASK_GERMANY_INVENTORY - MASK_ORDER_QTY < 0 ||
          GLOVES_UK_INVENTORY + GLOVES_GERMANY_INVENTORY - GLOVES_ORDER_QTY < 0
        ) {
          OUT_OF_STOCK_WP = true;
        } else {
          if (MASK_UK_INVENTORY - MASK_ORDER_QTY > 0) {
            MASK_UK_INVENTORY = MASK_UK_INVENTORY - MASK_ORDER_QTY;

            MASK_FINAL_AMT = MASK_ORDER_QTY * MASK_UK_COST;
          } else {
            DIFFERENCE_QTY = MASK_ORDER_QTY - MASK_UK_INVENTORY;

            MASK_UK_INVENTORY =
              MASK_UK_INVENTORY - (MASK_ORDER_QTY - DIFFERENCE_QTY);
            if (userInput[1][0] === "A") {
              TOTAL_TRANSPORT_COST = TRANSPORT_COST * (DIFFERENCE_QTY / 10);
              DISCOUNT_AMT = TOTAL_TRANSPORT_COST - TOTAL_TRANSPORT_COST * 0.2;
              MASK_FINAL_AMT =
                (MASK_ORDER_QTY - DIFFERENCE_QTY) * MASK_UK_COST +
                DIFFERENCE_QTY * MASK_GERMANY_COST +
                DISCOUNT_AMT;
            } else {
              MASK_FINAL_AMT =
                (MASK_ORDER_QTY - DIFFERENCE_QTY) * MASK_UK_COST +
                DIFFERENCE_QTY * MASK_GERMANY_COST;
            }
          }

          if (GLOVES_UK_INVENTORY - GLOVES_ORDER_QTY > 0) {
            GLOVES_UK_INVENTORY = GLOVES_UK_INVENTORY - GLOVES_ORDER_QTY;

            GLOVES_FINAL_AMT = GLOVES_ORDER_QTY * GLOVES_UK_COST;
          } else {
            DIFFERENCE_QTY = GLOVES_ORDER_QTY - GLOVES_UK_INVENTORY;

            GLOVES_UK_INVENTORY =
              GLOVES_UK_INVENTORY - (GLOVES_ORDER_QTY - DIFFERENCE_QTY);

            if (userInput[1][0] === "A") {
              TOTAL_TRANSPORT_COST = TRANSPORT_COST * (DIFFERENCE_QTY / 10);
              DISCOUNT_AMT = TOTAL_TRANSPORT_COST - TOTAL_TRANSPORT_COST * 0.2;
              GLOVES_FINAL_AMT =
                (GLOVES_ORDER_QTY - DIFFERENCE_QTY) * GLOVES_UK_COST +
                DIFFERENCE_QTY * GLOVES_GERMANY_COST +
                DISCOUNT_AMT;
            } else {
              GLOVES_FINAL_AMT =
                (GLOVES_ORDER_QTY - DIFFERENCE_QTY) * GLOVES_UK_COST +
                DIFFERENCE_QTY * GLOVES_GERMANY_COST;
            }
          }
        }
        console.log(
          `${
            OUT_OF_STOCK_WP
              ? ">>>>> OUT_OF_STOCK"
              : MASK_FINAL_AMT + GLOVES_FINAL_AMT
          }:${MASK_UK_INVENTORY}:${MASK_GERMANY_INVENTORY}:${GLOVES_UK_INVENTORY}:${GLOVES_GERMANY_INVENTORY}`
        );
        break;
      default:
        break;
    }
  }
};

console.log(`\n\nEnter a command: `);
askUser();
