/* ══════════════════════════════════════
   CHALLENGES | SQL challenges with attitude
   ══════════════════════════════════════ */

const CHALLENGES = [
    {
        id: 1, level: 'iniciante',
        title: 'Where did the money go?',
        question: 'Which 10 federal government bodies spent the most in 2025? Show the body and the total paid. Get ready for numbers with a lot of zeros.',
        hint: 'Use SUM(valor_pago) with GROUP BY orgao. Filter WHERE ano = 2025 and ORDER BY DESC with LIMIT 10.',
        solution: `SELECT orgao, SUM(valor_pago) AS total_pago\nFROM gastos_governo\nWHERE ano = 2025\nGROUP BY orgao\nORDER BY total_pago DESC\nLIMIT 10;`
    },
    {
        id: 2, level: 'iniciante',
        title: 'The real Brazil',
        question: 'How many federal civil servants are there in each state? Does the Federal District win by a mile? Find out.',
        hint: 'COUNT(*) with GROUP BY uf, sorted DESC.',
        solution: `SELECT uf, COUNT(*) AS total_servidores\nFROM servidores\nGROUP BY uf\nORDER BY total_servidores DESC;`
    },
    {
        id: 3, level: 'iniciante',
        title: 'Do civil servants earn well?',
        question: 'What is the average net salary per government body? Top 10. Spoiler: some will surprise you.',
        hint: 'AVG(total_liquido) with GROUP BY orgao. Use ROUND() to keep it tidy.',
        solution: `SELECT orgao, ROUND(AVG(total_liquido), 2) AS salario_medio\nFROM servidores\nGROUP BY orgao\nORDER BY salario_medio DESC\nLIMIT 10;`
    },
    {
        id: 4, level: 'intermediario',
        title: 'Who gets the most from the Union?',
        question: 'What is the total of federal transfers per state (UF) in 2025? Find out which states are the federal government\'s favourites.',
        hint: 'SUM(valor) with GROUP BY uf, filtered by ano = 2025.',
        solution: `SELECT uf, SUM(valor) AS total_recebido\nFROM transferencias\nWHERE ano = 2025\nGROUP BY uf\nORDER BY total_recebido DESC;`
    },
    {
        id: 5, level: 'intermediario',
        title: 'Promise vs reality',
        question: 'For each government function, how much of the committed money was actually paid? Calculate the percentage. Get ready to see that "committing" and "paying" are very different things.',
        hint: 'SUM(valor_pago) / SUM(valor_empenhado) * 100. GROUP BY funcao.',
        solution: `SELECT funcao,\n       SUM(valor_empenhado) AS empenhado,\n       SUM(valor_pago) AS pago,\n       ROUND(SUM(valor_pago) / SUM(valor_empenhado) * 100, 1) AS pct_pago\nFROM gastos_governo\nGROUP BY funcao\nORDER BY pct_pago ASC;`
    },
    {
        id: 6, level: 'intermediario',
        title: 'Amendments are health (literally)',
        question: 'Which parties directed the most budget amendments to Health (Saúde)? Show party, count and total paid. Everyone loves health when it is time to write amendments.',
        hint: 'WHERE area = \'Saúde\', GROUP BY partido. COUNT(*) and SUM(valor_pago).',
        solution: `SELECT partido,\n       COUNT(*) AS qtd_emendas,\n       SUM(valor_pago) AS total_pago\nFROM emendas\nWHERE area = 'Saúde'\nGROUP BY partido\nORDER BY total_pago DESC;`
    },
    {
        id: 7, level: 'intermediario',
        title: 'Where it really happens',
        question: 'Top 15 municipalities receiving the most federal transfers. Is it proportional to need or to political influence?',
        hint: 'GROUP BY uf, municipio with SUM(valor). ORDER DESC, LIMIT 15.',
        solution: `SELECT uf, municipio, SUM(valor) AS total_recebido\nFROM transferencias\nGROUP BY uf, municipio\nORDER BY total_recebido DESC\nLIMIT 15;`
    },
    {
        id: 8, level: 'avancado',
        title: 'Federal inequality',
        question: 'Which government bodies have the widest pay gap among their civil servants? Use the standard deviation of gross salary. Only consider bodies with 10+ civil servants. <em style="color:var(--g3);font-size:.75rem">(STDDEV requires PostgreSQL; in SQLite use MAX-MIN)</em>',
        hint: 'STDDEV(total_bruto) with GROUP BY orgao. HAVING COUNT(*) >= 10.',
        solution: `SELECT orgao,\n       COUNT(*) AS servidores,\n       ROUND(MIN(total_bruto), 2) AS menor,\n       ROUND(MAX(total_bruto), 2) AS maior,\n       ROUND(STDDEV(total_bruto)::numeric, 2) AS desvio_padrao\nFROM servidores\nGROUP BY orgao\nHAVING COUNT(*) >= 10\nORDER BY desvio_padrao DESC;`
    },
    {
        id: 9, level: 'avancado',
        title: 'Government Christmas',
        question: 'Monthly trend of paid spending in 2025 by function. Is December when the government opens the tap? Find the seasonal peaks.',
        hint: 'GROUP BY funcao, mes. Sort by funcao, mes.',
        solution: `SELECT funcao, mes,\n       SUM(valor_pago) AS total_pago\nFROM gastos_governo\nWHERE ano = 2025\nGROUP BY funcao, mes\nORDER BY funcao, mes;`
    },
    {
        id: 10, level: 'avancado',
        title: 'Home-state favouritism',
        question: 'Which members of Congress concentrate more than 70% of their amendments (by amount paid) in a single state? Use CTEs. These ones do not hide it very well.',
        hint: 'CTE 1: total per author. CTE 2: total per author+state. Divide and filter > 0.7.',
        solution: `WITH total_autor AS (\n    SELECT autor, SUM(valor_pago) AS total\n    FROM emendas GROUP BY autor\n),\npor_uf AS (\n    SELECT autor, uf, SUM(valor_pago) AS valor_uf\n    FROM emendas GROUP BY autor, uf\n)\nSELECT p.autor, p.uf, p.valor_uf,\n       ROUND(p.valor_uf / t.total * 100, 1) AS pct\nFROM por_uf p\nJOIN total_autor t ON t.autor = p.autor\nWHERE t.total > 0\n  AND p.valor_uf / t.total > 0.7\nORDER BY pct DESC;`
    }
];

const QUICK_EXAMPLES = [
    { label: 'How much goes to Health?', query: "SELECT SUM(valor_pago) AS total_saude FROM gastos_governo WHERE funcao = 'Saúde' AND ano = 2025;" },
    { label: 'Best-paid civil servants', query: "SELECT nome, cargo, orgao, total_bruto FROM servidores ORDER BY total_bruto DESC LIMIT 20;" },
    { label: 'Where do the amendments go?', query: "SELECT area, COUNT(*) AS qtd, SUM(valor_pago) AS total FROM emendas GROUP BY area ORDER BY total DESC;" },
    { label: 'Transfers by state', query: "SELECT uf, COUNT(*) AS qtd, SUM(valor) AS total FROM transferencias GROUP BY uf ORDER BY total DESC;" },
];

// ── Progress (localStorage) ──
function getProgress() {
    try { return JSON.parse(localStorage.getItem('sql_playground_progress') || '{}'); }
    catch { return {}; }
}
function markSolved(id) {
    const p = getProgress(); p[id] = true;
    localStorage.setItem('sql_playground_progress', JSON.stringify(p));
}
function isSolved(id) { return !!getProgress()[id]; }
function getSolvedCount() { return Object.keys(getProgress()).length; }
