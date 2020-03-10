// このファイルをいじる
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// 関数コンポーネント
// renderメソッドだけでstateを持たないもの propsを入力する
function Square {
    render()
    return (
        <button
            className="square"
            // X  O null を受け取る
            // boardから渡されている
            onClick={props.onClick}
        >
            {props.value}
        </button >
    );

}

class Board extends React.Component {
    renderSquare(i) {
        // square関数に渡す
        return (
            //squareコンポーネントはstateを管理しない
            <Square
                // 配列を新しくコピーする(イミュータブル)  
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );

    }

    render() {
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

// トップ
// 履歴
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 履歴
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumver: 0,
            xIsNext: true,
        }
    }
    // squareのクリック関数 クリックされるたびに呼び出される
    handleClick(i) {
        const history = this.state.history.slice(0,
            this.state.stepNumver + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculatewinner(squares) || squares[i]) {
            return;
        }

        // xIsNextの値によって中身を変える
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculatewinner(current.squares);
        // 履歴
        const moves = history.map((step, move) => {
            const desc = move ?
                'Goto move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner:' + winner;
        } else {
            status = 'Next player' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    // Boardを呼び出す  
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

// 決着の表示
function calculatewinner(squares) {
    // 全部の列の走査
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] &&
            squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}