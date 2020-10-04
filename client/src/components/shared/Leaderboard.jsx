import * as React from "react";

class Leaderboard extends React.Component{

    constructor(props) {
        super(props);
        this.state = { username: '' };
        this.state = {
            leaderboard: 
                [{ name: 'a', score: 0 }, { name: 'b', score: 0 }]
            
        };
    }

    async componentDidMount() {
        await this.getLeaderboard();
    }

    async getLeaderboard() {
        let response = await fetch('/lists/leaderboard');
        let leaderboard = await response.json();
        console.log(leaderboard);
        this.setState({ leaderboard });
        console.log(this.state.leaderboard);
    }

    render() 
    {
        return (
            <div>
                <p>0: Lachlan Brown (∞ points)</p>
                <p>1: Matthew Clifford (99999999 points)</p>
                <p>2: Everyone else (less points)</p>
                <div style={{ border: '3px solid green' }}>
                    <ul>
                        {this.state.leaderboard.map((entry, i) => {
                            return (
                                <li>{i}. {entry.name} ({entry.score} points)</li>
                            )
                        })}
                    </ul>
                </div>
            </div>

        );
      }
}

export default Leaderboard